import {CommonModule} from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {Router, RouterOutlet} from '@angular/router';
import {LoaderService} from '../../common/services/loader.service';
import { UserService } from '../../common/services/user.service';
import { ProfileDataService } from '../profile/profile.service';
import { FormsModule } from '@angular/forms';
import { map, mergeMap, } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

export interface Chat {
  id:number,
  companionName: string,
  companionAvatar: string,
  destinationPoints: {
    from: string,
    to: string,
  },
  lastMessageDate: Date,
  messages: {
    text: string,
    date: Date,
    isMine: boolean,
  }[],
  yourLastMessage: null|string,
  companionLastMessage: null|string,
  unreadMessagesCount: number,
  tripDate: Date
}

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './all-chats.component.html',
  styleUrl: './all-chats.component.scss',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule,FormsModule],
  providers: [UnsubscribeService],
})
export class AllChatsComponent implements OnInit {

  public selectedChatId: number|null= null;
  public selectedChat: Chat|null = null;
  public newMessage: string = '';
  public hideMessageDivider = false;
  userRole: string | null = null;
  public chats: Chat[]= [];
  @ViewChild('messageList') messageListRef!: ElementRef<HTMLDivElement>;


  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public userService: UserService,
    public profileService: ProfileDataService,
  ) {
    this.userService.role$.subscribe(role => {
      this.userRole = role;
    });
  }
  scrollToBottom() {
    try {
      this.messageListRef.nativeElement.scrollTop = this.messageListRef.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Ошибка скролла вниз', err);
    }
  }

  public getUniqueDriversForPassenger(userId: string) {
    return this.profileService.getUserPassegerTrips(userId).pipe(
      map(trips => {
        const uniqueDriversMap = new Map<number, Chat>();

        trips.forEach(trip => {
          const driverId = trip.tripDetails.driverId;
          if (!uniqueDriversMap.has(driverId)) {
            const unreadKey = `${userId}_${driverId}_unreadCount`;
                    const unreadMessagesCount = parseInt(localStorage.getItem(unreadKey) || '0', 10);
            uniqueDriversMap.set(driverId, {
              id: driverId,
              companionName: trip.tripDetails.driverName,
              companionAvatar: "profile-user",
              destinationPoints: {
                from: trip.tripDetails.departureLocation.city,
                to: trip.tripDetails.destinationLocation.city,
              },
              messages: [],
              lastMessageDate: new Date(),
              tripDate: new Date(trip.tripDetails.departureDateTime),
              yourLastMessage: null,
              companionLastMessage: null,
              unreadMessagesCount: unreadMessagesCount,
            });
          }
        });

        return Array.from(uniqueDriversMap.values());
      }),
    );
  }

  public saveMessage(sender: string, receiver: string, message: string) {
    const chatKey = `${sender}_${receiver}`;
    const chatMessages = JSON.parse(localStorage.getItem(chatKey) || '[]');

    const newMessage = {
        text: message,
        date: new Date(),
        sender: sender,
    };

    chatMessages.push(newMessage);
    localStorage.setItem(chatKey, JSON.stringify(chatMessages));



    const unreadKey = `${receiver}_${sender}_unreadCount`;
    const currentCount = parseInt(localStorage.getItem(unreadKey) || '0', 10);
    localStorage.setItem(unreadKey, (currentCount + 1).toString());
}



public loadMessages(userA: string, userB: string) {
  const chatKeyA = `${userA}_${userB}`;
  const chatKeyB = `${userB}_${userA}`;

  const chatMessagesA = JSON.parse(localStorage.getItem(chatKeyA) || '[]');
  const chatMessagesB = JSON.parse(localStorage.getItem(chatKeyB) || '[]');

  const allMessages = [...chatMessagesA, ...chatMessagesB];

  allMessages.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const currentUserId = userA;

  return allMessages.map(message => ({
      ...message,
      isMine: message.sender === currentUserId,
  }));
}

public selectChat(chatId: number) {
  this.selectedChatId = chatId;

  const chat = this.chats.find(c => c.id === chatId);

  if (chat) {
      const receiverId = this.userService.userId!;
      const senderId = chat.id;

      const unreadKey = `${receiverId}_${senderId}_unreadCount`;
      localStorage.setItem(unreadKey, '0');

      const messages = this.loadMessages(receiverId.toString(), senderId.toString());


      this.selectedChat = {
          ...chat,
          messages: messages,
          unreadMessagesCount: 0,
      };
      this.chats = this.chats.map((item)=>item.id === chatId?{...item, unreadMessagesCount:0} :item)
      setTimeout(() => this.scrollToBottom(), 0);
  } else {
      this.selectedChat = null;
  }
}

public sendMessage() {
  if (!this.newMessage.trim() || !this.selectedChat) return;

  const senderId = this.userService.userId!;
  const receiverId = this.selectedChat.id;


  this.saveMessage(senderId, receiverId.toString(), this.newMessage);

  const newMessage = {
      text: this.newMessage,
      date: new Date(),
      sender: senderId,
      isMine: true,
  };

  this.selectedChat.messages = [...this.selectedChat.messages, newMessage];

  const chatIndex = this.chats.findIndex(c => c.id === this.selectedChatId);
  if (chatIndex !== -1) {
      this.chats[chatIndex] = { ...this.selectedChat };
  }

  this.newMessage = '';
  setTimeout(() => this.scrollToBottom(), 0);
}


  public getUniquePassengersForDriver(userId: string) {
    return this.profileService.getUserDriverTrips(userId).pipe(
      mergeMap(trips => {
        const passengerRequests = trips.map(trip => this.profileService.getTripPassengers(trip.id.toString()));
        return forkJoin(passengerRequests).pipe(
          map(passengerLists => {
            const uniquePassengersMap = new Map<number, Chat>();

            passengerLists.forEach(passengers => {
              passengers.forEach(passenger => {
                if (!uniquePassengersMap.has(passenger.user.id)) {
                  const trip = trips.find(t => t.id === passenger.tripId);
                  if (trip) {

                    const unreadKey = `${userId}_${passenger.user.id}_unreadCount`;
                    const unreadMessagesCount = parseInt(localStorage.getItem(unreadKey) || '0', 10);
                    uniquePassengersMap.set(passenger.user.id, {
                      id: passenger.user.id,
                      companionName: passenger.user.firstName + " " + passenger.user.lastName,
                      companionAvatar: "profile-user",
                      destinationPoints: {
                        from: trip.departureLocation.city,
                        to: trip.destinationLocation.city,
                      },
                      messages: [],
                      lastMessageDate: new Date(),
                      tripDate: new Date(trip.departureDateTime),
                      yourLastMessage: null,
                      companionLastMessage: null,
                      unreadMessagesCount: unreadMessagesCount,
                    });
                  }
                }
              });
            });

            return Array.from(uniquePassengersMap.values());
          })
        );
      }),
    );
  }


  ngOnInit() {
    this.loaderService.setLoading(true);

    if (this.userRole === 'USER') {
      this.getUniqueDriversForPassenger(this.userService.userId!).subscribe(drivers => {
        this.chats = drivers;
        this.loaderService.setLoading(false);
      });
    } else if (this.userRole === 'DRIVER') {
      this.getUniquePassengersForDriver(this.userService.userId!).subscribe(passengers => {
        this.chats = passengers;
        this.loaderService.setLoading(false);
      });
    } else {
      this.loaderService.setLoading(false);
    }
  }



  showDivider(index: number) {
    if (this.selectedChat?.messages.length)
    return this.selectedChat?.unreadMessagesCount === this.selectedChat?.messages.length - index;
    return false;
  }



  showMessageDate(index: number) {
    const messages = this.selectedChat?.messages;

    if (!messages || index < 0 || index >= messages.length) {
        return false;
    }

    const currentMessage = messages[index];
    const nextMessage = messages[index + 1];

    return (currentMessage.isMine && !nextMessage?.isMine) || !nextMessage;
}

  protected readonly indexedDB = indexedDB;
}
