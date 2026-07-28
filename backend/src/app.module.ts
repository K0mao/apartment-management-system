import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import {JwtStrategy} from "./modules/auth/strategies/jwt.strategy";
import { ApartmentModule } from './modules/apartment/apartment.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { LeasesModule } from './modules/leases/leases.module';
import { UtilityBillsModule } from './modules/utility-bills/utility-bills.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    ApartmentModule,
    RoomsModule,
    TenantsModule,
    LeasesModule,
    UtilityBillsModule,
    InvoicesModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}