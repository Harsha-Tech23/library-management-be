import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BorrowService } from './borrow.service';

@Controller('borrow')
export class BorrowController {

constructor(private borrowService: BorrowService){}

@Post()
create(@Body() body:any){
return this.borrowService.create(body)
}

@Get()
getAllBorrows(){
return this.borrowService.getAllBorrows()
}

@Get(':userId')
getUserBorrows(@Param('userId') userId:number){
return this.borrowService.getUserBorrows(userId)
}

@Delete(':id')
remove(@Param('id') id:number){
return this.borrowService.remove(id)
}

}