import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AdminService } from './Admin.service';


@Injectable()
export class Admin {