import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {UnsubscribeService} from '../../common/services/unsubscribe.service';
import {Router, RouterOutlet} from '@angular/router';
import {LoaderService} from '../../common/services/loader.service';

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
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  providers: [UnsubscribeService],
})
export class AllChatsComponent implements OnInit {

  public selectedChatId: number|null= null;
  public selectedChat: Chat|null = null;
  public hideMessageDivider = false;

  public chats: Chat[] = [
      {
        id:1,
        companionName: "Константин",
        companionAvatar: "profile-user",
        destinationPoints: {
          from: "Минск",
          to: "Брест"
        },
        messages: [
          {
            text: "Добрый день, Константин!",
            date: new Date,
            isMine: true,
          },
          {
            text: "Подскажите, пожалуйста, можно ли поехать с маленькой собакой?",
            date: new Date,
            isMine: true,
          },
          {
            text: "Добрый день, да.",
            date: new Date,
            isMine: false,
          },
          {
            text: "Но только в сумке-переноске!",
            date: new Date,
            isMine: false,
          },
          {
            text: "Понял Вас, спасибо!",
            date: new Date,
            isMine: false,
          }
        ],
        lastMessageDate: new Date(),
        tripDate: new Date(),
        yourLastMessage: "Добрый день, да.",
        companionLastMessage: null,
        unreadMessagesCount: 0
    },
    {
      id:2,
      companionName: "Татьяна",
      companionAvatar: "profile-user",
      destinationPoints: {
        from: "Минск",
        to: "Брест"
      }, messages: [
        {
          text: "Добрый день, Татьяна!",
          date: new Date,
          isMine: true,
        },
        {
          text: "Подскажите, пожалуйста, можно ли поехать с маленькой собакой?",
          date: new Date,
          isMine: true,
        },
        {
          text: "Добрый день, да.",
          date: new Date,
          isMine: false,
        },
        {
          text: "Но только в сумке-переноске!",
          date: new Date,
          isMine: false,
        }
      ],
      lastMessageDate: new Date(),
      tripDate: new Date(),
      yourLastMessage: null,
      companionLastMessage: "Спасибо, до встречи!",
      unreadMessagesCount: 2
    },
    {
      id:3,
      companionName: "Игорь",
      companionAvatar: "profile-user",
      destinationPoints: {
        from: "Минск",
        to: "Могилев"
      }, messages: [
        {
          text: "Добрый день, Игорь!",
          date: new Date,
          isMine: true,
        },
        {
          text: "Подскажите, пожалуйста, можно ли поехать с маленькой собакой?",
          date: new Date,
          isMine: true,
        },
        {
          text: "Добрый день, да.",
          date: new Date,
          isMine: false,
        },
        {
          text: "Но только в сумке-переноске!",
          date: new Date,
          isMine: false,
        },
        {
          text: "Понял Вас, спасибо!",
          date: new Date,
          isMine: false,
        }
      ],
      lastMessageDate: new Date(),
      tripDate: new Date(),
      yourLastMessage: "Спасибо за поездку.",
      companionLastMessage: null,
      unreadMessagesCount: 0
    },
    // {
    //   id:4,
    //   companionName: "Михаил",
    //   companionAvatar: "profile-user",
    //   destinationPoints: {
    //     from: "Минск",
    //     to: "Витебск"
    //   },
    //   time: new Date(),
    //   yourLastMessage: "Доброе утро, да, смогу забрать.",
    //   companionLastMessage: null,
    //   unreadMessagesCount: 0
    // },
    // {
    //   id:5,
    //   companionName: "Константин",
    //   companionAvatar: "profile-user",
    //   destinationPoints: {
    //     from: "Минск",
    //     to: "Брест"
    //   },
    //   time: new Date(),
    //   yourLastMessage: "Добрый день, да.",
    //   companionLastMessage: null,
    //   unreadMessagesCount: 0
    // },
    // {
    //   id:6,
    //   companionName: "Татьяна",
    //   companionAvatar: "profile-user",
    //   destinationPoints: {
    //     from: "Минск",
    //     to: "Брест"
    //   },
    //   time: new Date(),
    //   yourLastMessage: null,
    //   companionLastMessage: "Спасибо, до встречи!",
    //   unreadMessagesCount: 2
    // },
    // {
    //   id:7,
    //   companionName: "Игорь",
    //   companionAvatar: "profile-user",
    //   destinationPoints: {
    //     from: "Минск",
    //     to: "Могилев"
    //   },
    //   time: new Date(),
    //   yourLastMessage: "Спасибо за поездку.",
    //   companionLastMessage: null,
    //   unreadMessagesCount: 0
    // },
    // {
    //   id:8,
    //   companionName: "Михаил",
    //   companionAvatar: "profile-user",
    //   destinationPoints: {
    //     from: "Минск",
    //     to: "Витебск"
    //   },
    //   time: new Date(),
    //   yourLastMessage: "Доброе утро, да, смогу забрать.",
    //   companionLastMessage: null,
    //   unreadMessagesCount: 0
    // },
  ]

  constructor(
    public router: Router,
    public loaderService: LoaderService,
  ) {}


  ngOnInit() {
    this.loaderService.setLoading(true);

    setTimeout(() => {
      this.loaderService.setLoading(false);
    }, 1500);
  }

  selectChat(id: number) {
    this.selectedChatId = id;
    this.selectedChat = this.chats.find((chat) => chat.id === id) || null;
  }

  showDivider(index: number) {
    if (this.selectedChat?.messages.length)
    return this.selectedChat?.unreadMessagesCount === this.selectedChat?.messages.length - index;
    return false;
  }

  showMessageDate(index: number) {
    return (this.selectedChat?.messages[index].isMine && !this.selectedChat?.messages[index+1].isMine) || !this.selectedChat?.messages[index+1] ;
  }

  // isShowMessageDate(index: number) {
  //   return
  // }
  protected readonly indexedDB = indexedDB;
}
