import { BaseApi } from './BaseApi'

import { ActiveCustomer } from './Apis/ActiveCustomer'
import { AddonCable } from './Apis/AddonCable'
import { AirtimeBill } from './Apis/AirtimeBill'
import { BillBiller } from './Apis/BillBiller'
import { Biller } from './Apis/Biller'
import { BundleBill } from './Apis/BundleBill'
import { BusinessIssuing } from './Apis/BusinessIssuing'
import { BvnIdentity } from './Apis/BvnIdentity'
import { CableBill } from './Apis/CableBill'
import { ChargeIssuing } from './Apis/ChargeIssuing'
import { Counterparty } from './Apis/Counterparty'
import { Country } from './Apis/Country'
import { Credit } from './Apis/Credit'
import { Crypto } from './Apis/Crypto'
import { CryptoWallet } from './Apis/CryptoWallet'
import { Currency } from './Apis/Currency'
import { CustomerAccount } from './Apis/CustomerAccount'
import { Customer } from './Apis/Customer'
import { CustomerTransaction } from './Apis/CustomerTransaction'
import { DataBill } from './Apis/DataBill'
import { DynamicAccountCollection } from './Apis/DynamicAccountCollection'
import { ElectricityBill } from './Apis/ElectricityBill'
import { EnrollCustomer } from './Apis/EnrollCustomer'
import { FetchInstitution } from './Apis/FetchInstitution'
import { FreezeIssuing } from './Apis/FreezeIssuing'
import { FundIssuing } from './Apis/FundIssuing'
import { Fx } from './Apis/Fx'
import { HistoryWallet } from './Apis/HistoryWallet'
import { Institution } from './Apis/Institution'
import { Issuing } from './Apis/Issuing'
import { IssuingTransaction } from './Apis/IssuingTransaction'
import { KycLink } from './Apis/KycLink'
import { MockTransactionIssuing } from './Apis/MockTransactionIssuing'
import { MockTransaction } from './Apis/MockTransaction'
import { MomoCollection } from './Apis/MomoCollection'
import { QuoteFx } from './Apis/QuoteFx'
import { ResolveAccount } from './Apis/ResolveAccount'
import { ResolveInstitution } from './Apis/ResolveInstitution'
import { VirtualAccountStatus } from './Apis/VirtualAccountStatus'
import { Subscription } from './Apis/Subscription'
import { TerminateIssuing } from './Apis/TerminateIssuing'
import { Tier1 } from './Apis/Tier1'
import { Tier2 } from './Apis/Tier2'
import { Transaction } from './Apis/Transaction'
import { TransferCrypto } from './Apis/TransferCrypto'
import { Transfer } from './Apis/Transfer'
import { UnfreezeIssuing } from './Apis/UnfreezeIssuing'
import { UpdateCustomer } from './Apis/UpdateCustomer'
import { Usd } from './Apis/Usd'
import { UsdTransfer } from './Apis/UsdTransfer'
import { UtilityBill } from './Apis/UtilityBill'
import { Verify } from './Apis/Verify'
import { VerifyOtp } from './Apis/VerifyOtp'
import { VirtualAccountCollection } from './Apis/VirtualAccountCollection'
import { VirtualAccountCustomer } from './Apis/VirtualAccountCustomer'
import { VirtualAccountRail } from './Apis/VirtualAccountRail'
import { Wallet } from './Apis/Wallet'
import { WithdrawIssuing } from './Apis/WithdrawIssuing'

export class ApiBinder extends BaseApi {
    activeCustomers!: ActiveCustomer
    addonCables!: AddonCable
    airtimeBills!: AirtimeBill
    billBillers!: BillBiller
    billers!: Biller
    bundleBills!: BundleBill
    businessIssuings!: BusinessIssuing
    bvnIdentities!: BvnIdentity
    cableBills!: CableBill
    chargeIssuings!: ChargeIssuing
    counterparties!: Counterparty
    countries!: Country
    credits!: Credit
    cryptos!: Crypto
    cryptoWallets!: CryptoWallet
    currencies!: Currency
    customerAccounts!: CustomerAccount
    customers!: Customer
    customerTransactions!: CustomerTransaction
    dataBills!: DataBill
    dynamicAccountCollections!: DynamicAccountCollection
    electricityBills!: ElectricityBill
    enrollCustomers!: EnrollCustomer
    fetchInstitutions!: FetchInstitution
    freezeIssuings!: FreezeIssuing
    fundIssuings!: FundIssuing
    fxs!: Fx
    historyWallets!: HistoryWallet
    institutions!: Institution
    issuings!: Issuing
    issuingTransactions!: IssuingTransaction
    kycLinks!: KycLink
    mockTransactionIssuings!: MockTransactionIssuing
    mockTransactions!: MockTransaction
    momoCollections!: MomoCollection
    quoteFxs!: QuoteFx
    resolveAccounts!: ResolveAccount
    resolveInstitutions!: ResolveInstitution
    virtualAccountStatus!: VirtualAccountStatus
    subscriptions!: Subscription
    terminateIssuings!: TerminateIssuing
    tier1s!: Tier1
    tier2s!: Tier2
    transactions!: Transaction
    transferCryptos!: TransferCrypto
    transfers!: Transfer
    unfreezeIssuings!: UnfreezeIssuing
    updateCustomers!: UpdateCustomer
    usds!: Usd
    usdTransfers!: UsdTransfer
    utilityBills!: UtilityBill
    verifies!: Verify
    verifyOtps!: VerifyOtp
    virtualAccountCollections!: VirtualAccountCollection
    virtualAccountCustomers!: VirtualAccountCustomer
    virtualAccountRails!: VirtualAccountRail
    wallets!: Wallet
    withdrawIssuings!: WithdrawIssuing

    protected override boot () {
        this.activeCustomers = new ActiveCustomer(this.core)
        this.addonCables = new AddonCable(this.core)
        this.airtimeBills = new AirtimeBill(this.core)
        this.billBillers = new BillBiller(this.core)
        this.billers = new Biller(this.core)
        this.bundleBills = new BundleBill(this.core)
        this.businessIssuings = new BusinessIssuing(this.core)
        this.bvnIdentities = new BvnIdentity(this.core)
        this.cableBills = new CableBill(this.core)
        this.chargeIssuings = new ChargeIssuing(this.core)
        this.counterparties = new Counterparty(this.core)
        this.countries = new Country(this.core)
        this.credits = new Credit(this.core)
        this.cryptos = new Crypto(this.core)
        this.cryptoWallets = new CryptoWallet(this.core)
        this.currencies = new Currency(this.core)
        this.customerAccounts = new CustomerAccount(this.core)
        this.customers = new Customer(this.core)
        this.customerTransactions = new CustomerTransaction(this.core)
        this.dataBills = new DataBill(this.core)
        this.dynamicAccountCollections = new DynamicAccountCollection(this.core)
        this.electricityBills = new ElectricityBill(this.core)
        this.enrollCustomers = new EnrollCustomer(this.core)
        this.fetchInstitutions = new FetchInstitution(this.core)
        this.freezeIssuings = new FreezeIssuing(this.core)
        this.fundIssuings = new FundIssuing(this.core)
        this.fxs = new Fx(this.core)
        this.historyWallets = new HistoryWallet(this.core)
        this.institutions = new Institution(this.core)
        this.issuings = new Issuing(this.core)
        this.issuingTransactions = new IssuingTransaction(this.core)
        this.kycLinks = new KycLink(this.core)
        this.mockTransactionIssuings = new MockTransactionIssuing(this.core)
        this.mockTransactions = new MockTransaction(this.core)
        this.momoCollections = new MomoCollection(this.core)
        this.quoteFxs = new QuoteFx(this.core)
        this.resolveAccounts = new ResolveAccount(this.core)
        this.resolveInstitutions = new ResolveInstitution(this.core)
        this.virtualAccountStatus = new VirtualAccountStatus(this.core)
        this.subscriptions = new Subscription(this.core)
        this.terminateIssuings = new TerminateIssuing(this.core)
        this.tier1s = new Tier1(this.core)
        this.tier2s = new Tier2(this.core)
        this.transactions = new Transaction(this.core)
        this.transferCryptos = new TransferCrypto(this.core)
        this.transfers = new Transfer(this.core)
        this.unfreezeIssuings = new UnfreezeIssuing(this.core)
        this.updateCustomers = new UpdateCustomer(this.core)
        this.usds = new Usd(this.core)
        this.usdTransfers = new UsdTransfer(this.core)
        this.utilityBills = new UtilityBill(this.core)
        this.verifies = new Verify(this.core)
        this.verifyOtps = new VerifyOtp(this.core)
        this.virtualAccountCollections = new VirtualAccountCollection(this.core)
        this.virtualAccountCustomers = new VirtualAccountCustomer(this.core)
        this.virtualAccountRails = new VirtualAccountRail(this.core)
        this.wallets = new Wallet(this.core)
        this.withdrawIssuings = new WithdrawIssuing(this.core)
    }
}