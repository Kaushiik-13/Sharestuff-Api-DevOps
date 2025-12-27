import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { HealthController } from './health/health.controller';
import { AuthModule } from './auth/auth.module';
import { SellerProfileModule } from './seller_profile_creation/sellerProfile.module';
import { itemListingModule } from './item_listing/itemListing.module';
import { ReviewsModule } from './reviews/reviews.module';
import { rentalRequestModule } from './rental_requests/rentalRequest.module';

@Module({
  imports: [
    // Load .env file globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        // 👇 Skip DB in CI
        if (config.get('NODE_ENV') === 'ci') {
          return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'dummy',
            password: 'dummy',
            database: 'dummy',
            entities: [],
            synchronize: false,
            autoLoadEntities: false,
          };
        }

        // 👇 Normal DB config
        return {
          type: 'mysql',
          host: config.getOrThrow('DB_HOST'),
          port: config.getOrThrow<number>('DB_PORT'),
          username: config.getOrThrow('DB_USER'),
          password: config.getOrThrow('DB_PASSWORD'),
          database: config.getOrThrow('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
        };
      },
    }),



    // Mailer configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          service: 'gmail',
          auth: {
            user: config.getOrThrow<string>('MAIL_USER'),
            pass: config.getOrThrow<string>('MAIL_PASS'),
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

    // Other feature modules
    AuthModule,
    SellerProfileModule,
    itemListingModule,
    ReviewsModule,
    rentalRequestModule,
  ],
  controllers: [HealthController],
})
export class AppModule { }
