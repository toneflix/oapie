import type { ExtractedApiDocumentApi } from './Schema'
import { extractedApiDocumentSdk } from './Schema'
import { createSdk as createBoundSdk } from '@oapiex/sdk-kit'
import type { BaseApi as KitBaseApi, Core as KitCore, InitOptions } from '@oapiex/sdk-kit'

export * from './Schema'
export { BaseApi } from './Apis/BaseApi'
export { ActiveCustomer as ActiveCustomerApi } from './Apis/ActiveCustomer'
export { AddonCable as AddonCableApi } from './Apis/AddonCable'
export { AirtimeBill as AirtimeBillApi } from './Apis/AirtimeBill'
export { BillBiller as BillBillerApi } from './Apis/BillBiller'
export { Biller as BillerApi } from './Apis/Biller'
export { BundleBill as BundleBillApi } from './Apis/BundleBill'
export { BusinessIssuing as BusinessIssuingApi } from './Apis/BusinessIssuing'
export { BvnIdentity as BvnIdentityApi } from './Apis/BvnIdentity'
export { CableBill as CableBillApi } from './Apis/CableBill'
export { ChargeIssuing as ChargeIssuingApi } from './Apis/ChargeIssuing'
export { Counterparty as CounterpartyApi } from './Apis/Counterparty'
export { Country as CountryApi } from './Apis/Country'
export { Credit as CreditApi } from './Apis/Credit'
export { Crypto as CryptoApi } from './Apis/Crypto'
export { CryptoWallet as CryptoWalletApi } from './Apis/CryptoWallet'
export { Currency as CurrencyApi } from './Apis/Currency'
export { CustomerAccount as CustomerAccountApi } from './Apis/CustomerAccount'
export { Customer as CustomerApi } from './Apis/Customer'
export { CustomerTransaction as CustomerTransactionApi } from './Apis/CustomerTransaction'
export { DataBill as DataBillApi } from './Apis/DataBill'
export { DynamicAccountCollection as DynamicAccountCollectionApi } from './Apis/DynamicAccountCollection'
export { ElectricityBill as ElectricityBillApi } from './Apis/ElectricityBill'
export { EnrollCustomer as EnrollCustomerApi } from './Apis/EnrollCustomer'
export { FetchInstitution as FetchInstitutionApi } from './Apis/FetchInstitution'
export { FreezeIssuing as FreezeIssuingApi } from './Apis/FreezeIssuing'
export { FundIssuing as FundIssuingApi } from './Apis/FundIssuing'
export { Fx as FxApi } from './Apis/Fx'
export { HistoryWallet as HistoryWalletApi } from './Apis/HistoryWallet'
export { Institution as InstitutionApi } from './Apis/Institution'
export { Issuing as IssuingApi } from './Apis/Issuing'
export { IssuingTransaction as IssuingTransactionApi } from './Apis/IssuingTransaction'
export { MockTransactionIssuing as MockTransactionIssuingApi } from './Apis/MockTransactionIssuing'
export { MockTransaction as MockTransactionApi } from './Apis/MockTransaction'
export { MomoCollection as MomoCollectionApi } from './Apis/MomoCollection'
export { QuoteFx as QuoteFxApi } from './Apis/QuoteFx'
export { ResolveAccount as ResolveAccountApi } from './Apis/ResolveAccount'
export { ResolveInstitution as ResolveInstitutionApi } from './Apis/ResolveInstitution'
export { Statu as StatuApi } from './Apis/Statu'
export { Subscription as SubscriptionApi } from './Apis/Subscription'
export { TerminateIssuing as TerminateIssuingApi } from './Apis/TerminateIssuing'
export { Tier1 as Tier1Api } from './Apis/Tier1'
export { Tier2 as Tier2Api } from './Apis/Tier2'
export { Transaction as TransactionApi } from './Apis/Transaction'
export { TransferCrypto as TransferCryptoApi } from './Apis/TransferCrypto'
export { Transfer as TransferApi } from './Apis/Transfer'
export { UnfreezeIssuing as UnfreezeIssuingApi } from './Apis/UnfreezeIssuing'
export { UpdateCustomer as UpdateCustomerApi } from './Apis/UpdateCustomer'
export { Usd as UsdApi } from './Apis/Usd'
export { UsdTransfer as UsdTransferApi } from './Apis/UsdTransfer'
export { UtilityBill as UtilityBillApi } from './Apis/UtilityBill'
export { Verify as VerifyApi } from './Apis/Verify'
export { VerifyOtp as VerifyOtpApi } from './Apis/VerifyOtp'
export { VirtualAccountCollection as VirtualAccountCollectionApi } from './Apis/VirtualAccountCollection'
export { VirtualAccountCustomer as VirtualAccountCustomerApi } from './Apis/VirtualAccountCustomer'
export { VirtualAccountRail as VirtualAccountRailApi } from './Apis/VirtualAccountRail'
export { Wallet as WalletApi } from './Apis/Wallet'
export { WithdrawIssuing as WithdrawIssuingApi } from './Apis/WithdrawIssuing'
export { Core } from './Core'

export const createClient = (
    options: InitOptions
): KitCore & { api: KitBaseApi & ExtractedApiDocumentApi } =>
    createBoundSdk(extractedApiDocumentSdk, options) as KitCore & { api: KitBaseApi & ExtractedApiDocumentApi }

export {
    BadRequestException,
    Builder,
    ForbiddenRequestException,
    Http,
    HttpException,
    UnauthorizedRequestException,
    WebhookValidator,
    createSdk,
} from '@oapiex/sdk-kit'

export type {
    InitOptions,
    UnifiedResponse,
    XGenericObject,
} from '@oapiex/sdk-kit'