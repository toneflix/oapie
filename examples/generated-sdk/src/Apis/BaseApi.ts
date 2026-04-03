import { BaseApi as KitBaseApi } from '@oapiex/sdk-kit'

import { ActiveCustomer } from './ActiveCustomer'
import { AddonCable } from './AddonCable'
import { AirtimeBill } from './AirtimeBill'
import { BillBiller } from './BillBiller'
import { Biller } from './Biller'
import { BundleBill } from './BundleBill'
import { BusinessIssuing } from './BusinessIssuing'
import { BvnIdentity } from './BvnIdentity'
import { CableBill } from './CableBill'
import { ChargeIssuing } from './ChargeIssuing'
import { Counterparty } from './Counterparty'
import { Country } from './Country'
import { Credit } from './Credit'
import { Crypto } from './Crypto'
import { CryptoWallet } from './CryptoWallet'
import { Currency } from './Currency'
import { CustomerAccount } from './CustomerAccount'
import { Customer } from './Customer'
import { CustomerTransaction } from './CustomerTransaction'
import { DataBill } from './DataBill'
import { DynamicAccountCollection } from './DynamicAccountCollection'
import { ElectricityBill } from './ElectricityBill'
import { EnrollCustomer } from './EnrollCustomer'
import { FetchInstitution } from './FetchInstitution'
import { FreezeIssuing } from './FreezeIssuing'
import { FundIssuing } from './FundIssuing'
import { Fx } from './Fx'
import { HistoryWallet } from './HistoryWallet'
import { Institution } from './Institution'
import { Issuing } from './Issuing'
import { IssuingTransaction } from './IssuingTransaction'
import { MockTransactionIssuing } from './MockTransactionIssuing'
import { MockTransaction } from './MockTransaction'
import { MomoCollection } from './MomoCollection'
import { QuoteFx } from './QuoteFx'
import { ResolveAccount } from './ResolveAccount'
import { ResolveInstitution } from './ResolveInstitution'
import { Statu } from './Statu'
import { Subscription } from './Subscription'
import { TerminateIssuing } from './TerminateIssuing'
import { Tier1 } from './Tier1'
import { Tier2 } from './Tier2'
import { Transaction } from './Transaction'
import { TransferCrypto } from './TransferCrypto'
import { Transfer } from './Transfer'
import { UnfreezeIssuing } from './UnfreezeIssuing'
import { UpdateCustomer } from './UpdateCustomer'
import { Usd } from './Usd'
import { UsdTransfer } from './UsdTransfer'
import { UtilityBill } from './UtilityBill'
import { Verify } from './Verify'
import { VerifyOtp } from './VerifyOtp'
import { VirtualAccountCollection } from './VirtualAccountCollection'
import { VirtualAccountCustomer } from './VirtualAccountCustomer'
import { VirtualAccountRail } from './VirtualAccountRail'
import { Wallet } from './Wallet'
import { WithdrawIssuing } from './WithdrawIssuing'

export class BaseApi extends KitBaseApi {
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
    mockTransactionIssuings!: MockTransactionIssuing
    mockTransactions!: MockTransaction
    momoCollections!: MomoCollection
    quoteFxs!: QuoteFx
    resolveAccounts!: ResolveAccount
    resolveInstitutions!: ResolveInstitution
    status!: Statu
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
        this.mockTransactionIssuings = new MockTransactionIssuing(this.core)
        this.mockTransactions = new MockTransaction(this.core)
        this.momoCollections = new MomoCollection(this.core)
        this.quoteFxs = new QuoteFx(this.core)
        this.resolveAccounts = new ResolveAccount(this.core)
        this.resolveInstitutions = new ResolveInstitution(this.core)
        this.status = new Statu(this.core)
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