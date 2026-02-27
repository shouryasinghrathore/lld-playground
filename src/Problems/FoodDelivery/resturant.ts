export class MenuItem{
    constructor(public readonly id:string,public name:string ,public price:number , public available:boolean=true){}
}

export class Restaurant {
   private menu = new Map<string,MenuItem>();
    constructor(public id:string, public name:string){}
   addMenuItem(item:MenuItem){
    this.menu.set(item.id,item);
   }

   getItem(id:string){
    return this.menu.get(id);
   }

   updatePrice(id:string, price:number){
    const item = this.menu.get(id);
    if(item) item.price =price;
    return;
   }
    setAvailability(itemId: string, available: boolean) {
    const item = this.menu.get(itemId);
    if (item) item.available = available;
  }
   getMenu(){
    return Array.from(this.menu.values());
   }

}