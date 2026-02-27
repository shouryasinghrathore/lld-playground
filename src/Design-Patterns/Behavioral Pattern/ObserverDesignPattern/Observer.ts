interface ISubscriber{
    update():void;
}

interface IChannel{
    subscribe(subscriber:ISubscriber):void;
    unsubscribe(subscriber:ISubscriber):void;
    notifySubscribers():void;
}



class Channel implements IChannel{
    constructor(public name:string){}
    private subscribers:ISubscriber[] =[];
    private latestVideo:string="";
    subscribe(subscriber: ISubscriber): void {
        this.subscribers.push(subscriber);
    }
    unsubscribe(subscriber: ISubscriber): void {
        this.subscribers = this.subscribers.filter((x)=> x!==subscriber);
    }
    notifySubscribers(): void {
        this.subscribers.forEach((sub)=>sub.update());
    }
      uploadVideo(title: string): void {
    this.latestVideo = title;
    console.log(`\n[${this.name} uploaded "${title}"]`);
    this.notifySubscribers();
  }

  getLatestVideo(){
    return `Recently uploaded video ${this.latestVideo}`
  }

}

class Subscriber implements ISubscriber{
    constructor(public name:string,public channel:Channel){}
    update(): void {
        console.log(`hey ${this.name} new video ${this.channel.getLatestVideo()}`)
    }
}
const channel= new Channel("tech");
const newsub1 = new Subscriber("shourya",channel);
const newsub2 = new Subscriber("kavita",channel);
channel.subscribe(newsub1)
channel.subscribe(newsub2)
channel.uploadVideo("daily tech")