import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { SellerProfileModule } from './seller_profile_creation/sellerProfile.module';
import { itemListingModule } from './item_listing/itemListing.module';
import { ReviewsModule } from './reviews/reviews.module';
import { rentalRequestModule } from './rental_requests/rentalRequest.module';

// 🔑 Feature flags
const enableDb = process.env.ENABLE_DB !== 'false';
const enableMailer = process.env.ENABLE_MAILER !== 'false';
const enableAuth = process.env.ENABLE_AUTH !== 'false';

@Module({
  imports: [
    // 🔹 Config
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'ci',
    }),

    // 🔹 Database core
    ...(enableDb
      ? [
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              type: 'mysql',
              host: config.getOrThrow('DB_HOST'),
              port: Number(config.getOrThrow('DB_PORT')),
              username: config.getOrThrow('DB_USERNAME'),
              password: config.getOrThrow('DB_PASSWORD'),
              database: config.getOrThrow('DB_NAME'),
              autoLoadEntities: true,
              synchronize: false,
            }),
          }),
        ]
      : []),

    // 🔹 DB-dependent feature modules
    ...(enableDb
      ? [
          SellerProfileModule,
          itemListingModule,
          ReviewsModule,
          rentalRequestModule,
        ]
      : []),

    // 🔹 Auth (usually DB-backed)
    ...(enableAuth ? [AuthModule] : []),

    // 🔹 Mailer
    ...(enableMailer
      ? [
          MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              transport: {
                service: 'gmail',
                auth: {
                  user: config.getOrThrow('MAIL_USER'),
                  pass: config.getOrThrow('MAIL_PASS'),
                },
              },
              defaults: {
                from: '"ShareStuff Support" <no-reply@sharestuff.com>',
              },
              template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: { strict: true },
              },
            }),
          }),
        ]
      : []),
  ],
  controllers: [HealthController],
})
export class AppModule {}
