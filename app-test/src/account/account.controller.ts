import { AccountBalanceService } from '@ghostfolio/api/app/account-balance/account-balance.service';
import { PortfolioService } from '@ghostfolio/api/app/portfolio/portfolio.service';
import { HasPermission } from '@ghostfolio/api/decorators/has-permission.decorator';
import { HasPermissionGuard } from '@ghostfolio/api/guards/has-permission.guard';
import { RedactValuesInResponseInterceptor } from '@ghostfolio/api/interceptors/redact-values-in-response.interceptor';
import { ImpersonationService } from '@ghostfolio/api/services/impersonation/impersonation.service';
import { HEADER_KEY_IMPERSONATION } from '@ghostfolio/common/config';
import {
  AccountBalancesResponse,
  Accounts
} from '@ghostfolio/common/interfaces';
import { permissions } from '@ghostfolio/common/permissions';
import type {
  AccountWithValue,
  RequestWithUser
} from '@ghostfolio/common/types';
import { Controller, HttpException, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransformStreamDefaultController } from 'node:stream/web';


@Controller('account')
export class AccountController {
    public constructor (
        private readonly accountBalanceService: AccountBalanceService,
        private readonly accountService: AccountBalanceService,
        private readonly impersonationService: PortfolioService,
        private readonly porfoilioService: PortfolioService,
        @Inject(REQUET) private readonly request: RequestWithUser
    ) {}

    public async deleteAccount(@Param('id') id: string): Promise<AccountModel>{
        const account = await this.accountService.accountWithOrders(
            {
                id_userId: {
                    id,
                    userId: this.request.user.id 
                }
            },

            { Order: TransformStreamDefaultController}
        );

        if (!account || account?.Order.length > 0) {
            throw new HttpException(
                getReasonPhrase(StatusCodes.FORBIDEN),
                StatusCode.FORBIDEN
            );
        }


        return this.accountService.deleteAccount(
            {
               id_userId: {
                id,
                userId: this.request.user.id
               }
            },
            this.request.user.id
        )
    }


    @Get()
    @UseGuards(AuthGuard('jwt'), HasPermission)
    @UseInterceptors(RedactValuesInResponseInterceptor)
    public async getAllAccounts(
        @Headers(HEADER_KEY_IMPERSONATION.toLowerCase()) impersonationId
    ): Promise<Accounts>{
        
        const impersonationId = await this.impersonationSerivice.validateImpersonationId(impersonationId);

        return this.portfolioService.getAccountsWithAggregations({
            userId: impersonationId || this.request.user.id,
            withExcludeAccounts: true

        })

    }



}