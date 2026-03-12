import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

constructor(
@InjectRepository(User)
private userRepo: Repository<User>,
) {}


async signup(body:any){

const existingUser = await this.userRepo.findOne({
where:{ email: body.email }
});

if(existingUser){
return { message:"Email already exists" };
}

const user = this.userRepo.create({
name: body.name,
email: body.email,
password: body.password,
role: body.role
});

await this.userRepo.save(user);

return { message:"Signup successful" };

}


async login(body:any){

const user = await this.userRepo.findOne({
where:{ email: body.email }
});

if(!user){
return { message:"User not found" };
}

if(user.password !== body.password){
return { message:"Invalid password" };
}

return {
message:"Login successful",
userId:user.id,
role:user.role
};

}


async resetPassword(body:any){

const user = await this.userRepo.findOne({
where:{ email: body.email }
});

if(!user){
return { message:"User not found" };
}

user.password = body.newPassword;

await this.userRepo.save(user);

return { message:"Password updated successfully" };

}

}
