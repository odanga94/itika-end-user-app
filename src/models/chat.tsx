//import moment from 'moment';

class Chat {
  id: any;
  chatDetails: any;

  constructor(id: any, chatDetails: any) {
    this.id = id;
    this.chatDetails = chatDetails;
  }

  /* get readableDate() {
    return moment(this.orderDetails.dateRequested).format(
      'MMMM Do YYYY, h:mm a',
    );
  } */
}

export default Chat;
