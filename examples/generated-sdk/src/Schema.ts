export interface Customer {
  active?: boolean
  address?: Address
  can_enrol_visa_card?: boolean
  country?: string
  created_at?: string
  disabled?: boolean
  dob?: string
  email?: string
  first_name?: string
  id?: string
  identity?: Identity
  last_name?: string
  middle_name?: null
  name?: string
  phone_number?: string
  status?: string
  tier?: number
  type?: string
  updated_at?: string
}

export interface CustomerResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export interface Data {
  account_id?: string
  account_name?: string
  account_number?: string
  account_type?: null
  active?: boolean
  addons?: string[]
  address?: Address
  amount?: string | number
  amount_of_power?: string
  auto_approve?: boolean
  balance?: number
  balance_type?: string
  balance_updated_at?: string
  bank_name?: string
  bundle?: string
  business_id?: string
  calling_code?: string
  can_enrol_visa_card?: boolean
  card_id?: string
  card_number?: null | string
  card_transaction_id?: string
  channel?: string
  code?: string
  commission?: number
  commission_earned?: number
  configuration_token?: string
  consent_url?: null
  consented?: boolean
  country?: string
  created_at?: string
  CreatedAt?: string
  credit?: number
  currency?: string
  current_balance?: number
  customer?: Customer
  cvv?: null | string
  data?: string
  debit?: number
  debit_amount?: number
  DeletedAt?: null
  description?: string
  destination_amount?: number
  destination_currency_id?: string
  disabled?: boolean
  dob?: string
  duration?: number
  electricity_distributor?: string
  email?: string
  entry?: string
  estimated_duration?: string
  expiry?: null | string
  fee?: string | number
  first_name?: string
  gender?: string
  iban?: Iban[]
  id?: string
  ID?: string
  identifier?: string
  identity?: Identity
  image?: string
  institution_name?: string
  InstitutionName?: string
  issuer?: string
  kyc_link?: string
  last_name?: string
  masked_pan?: string
  merchant?: Merchant
  message?: string[]
  meta?: null
  meter_number?: string
  middle_name?: null | string
  name?: string
  network?: string
  otp_instruction?: OtpInstruction
  partner?: string
  payment_rail?: string[]
  payment_rails?: string[]
  phone_number?: string
  plan?: string
  plan_id?: string
  previous_balance?: number
  price?: number
  provider?: string
  rail?: string
  rate?: number
  reason?: string | null
  reference?: string | null
  related_transaction_id?: null
  require_consent?: boolean
  requires_otp?: boolean
  reset_token?: string
  reversal?: boolean
  routing_number?: string
  smartcard_number?: string
  source?: Source
  source_amount?: number
  source_currency_id?: string
  status?: string
  subscription_plans?: SubscriptionPlan[]
  summary?: string
  symbol?: string
  target?: Source
  tier?: number
  title?: string
  token?: string
  token_amount?: number
  transaction_id?: string
  type?: string
  updated_at?: string
  UpdatedAt?: string
  validity?: string
  wallet_id?: string
}

export interface CustomerResponseExampleVariant2 { }

export type CustomerResponseExample =
  | CustomerResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CustomerInput {
  country: string
  email: string
  first_name: string
  last_name: string
}

export interface CustomerQuery {
  email?: string
  end_date?: string
  page?: string
  page_size?: string
  search?: string
  start_date?: string
  status?: string
}

export interface CustomerHeader { }

export interface CustomerParams { }

export interface Address {
  address?: string
  city?: string
  country?: string
  postal_code?: string
  state?: string
  street?: string
  street2?: string | null
  zip_code?: string
}

export interface Identity {
  country?: string
  image?: null | string
  number?: string
  type?: string
}

export interface CustomerResponseExampleVariant1CustomerResponseExampleVariant1 {
  data?: Data[]
  message?: string
  meta?: Meta
  status?: boolean
}

export interface Meta {
  counterparty?: Counterparty
  page?: number
  page_size?: number
  scheme?: string
  sender?: Sender
  total?: number
}

export type CustomerResponseExampleList =
  | CustomerResponseExampleVariant1CustomerResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CustomerListInput { }

export interface Tier1 {
  message?: string
  status?: boolean
}

export interface Tier1ResponseExampleVariant1 {
  message?: string
  status?: boolean
}

export type Tier1ResponseExample =
  | Tier1ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface Tier1Input {
  address: Address
  customer_id: string
  dob: string
  identification_number: string
  phone: Phone
  photo?: string
}

export interface Phone {
  phone_country_code?: string
  phone_number?: string
}

export interface Tier1Query extends CustomerQuery { }

export interface Tier1Header extends CustomerHeader { }

export interface Tier1Params extends CustomerParams { }

export interface Tier2 {
  id?: string
  status?: string
}

export interface Tier2ResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type Tier2ResponseExample =
  | Tier2ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface Tier2Input {
  customer_id: string
  identity: Identity
  photo?: string
}

export interface Tier2Query extends CustomerQuery { }

export interface Tier2Header extends CustomerHeader { }

export interface Tier2Params extends CustomerParams { }

export interface Enroll extends Customer { }

export type EnrollResponseExample =
  | CustomerResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface EnrollInput {
  address: Address
  country: string
  dob: string
  email: string
  first_name: string
  identification_number: string
  identity?: Identity
  last_name: string
  phone: Phone
  photo?: string
}

export interface EnrollQuery extends CustomerQuery { }

export interface EnrollHeader extends CustomerHeader { }

export interface EnrollParams extends CustomerParams { }

export interface Active { }

export interface ActiveResponseExample { }

export interface ActiveInput {
  blacklist: boolean
}

export interface ActiveQuery extends CustomerQuery { }

export interface ActiveHeader extends CustomerHeader { }

export interface ActiveParams {
  customer_id: string
}

export type CustomerResponseExampleById =
  | CustomerResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CustomerByIdParams {
  id: string
}

export interface CustomerAccount {
  account_name?: string
  account_number?: string
  bank_name?: string
  created_at?: string
  currency?: string
  id?: string
}

export interface CustomerAccountResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type CustomerAccountResponseExample =
  | CustomerAccountResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CustomerAccountInput extends CustomerListInput { }

export interface CustomerAccountQuery extends CustomerQuery { }

export interface CustomerAccountHeader extends CustomerHeader { }

export interface CustomerAccountParams extends CustomerByIdParams { }

export interface CustomerTransaction {
  account_id?: string
  amount?: string
  channel?: string
  created_at?: string
  currency?: string
  customer?: Customer
  entry?: string
  fee?: string
  id?: string
  reason?: string
  reference?: string
  source?: Source
  status?: string
  summary?: string
  type?: string
  updated_at?: string
}

export interface Source {
  account_name?: string
  account_number?: string
  amount?: number
  bank_code?: null | string
  bank_name?: string
  currency?: string
  human_readable_amount?: number
}

export interface CustomerTransactionResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type CustomerTransactionResponseExample =
  | CustomerTransactionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CustomerTransactionInput extends CustomerListInput { }

export interface CustomerTransactionQuery extends CustomerQuery { }

export interface CustomerTransactionHeader extends CustomerHeader { }

export interface CustomerTransactionParams extends CustomerByIdParams { }

export interface CustomerVirtualAccount extends CustomerAccount { }

export type CustomerVirtualAccountResponseExample =
  | CustomerAccountResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CustomerVirtualAccountInput extends CustomerListInput { }

export interface CustomerVirtualAccountQuery extends CustomerQuery { }

export interface CustomerVirtualAccountHeader extends CustomerHeader { }

export interface CustomerVirtualAccountParams extends ActiveParams { }

export interface Update extends Active { }

export interface UpdateResponseExample extends ActiveResponseExample { }

export interface UpdateInput {
  address?: Address
  customer_id: string
  first_name?: string
  identification_number?: string
  identity?: Identity
  last_name?: string
  middle_name?: string
  nationality?: string
  phone?: Phone
  photo?: string
}

export interface UpdateQuery extends CustomerQuery { }

export interface UpdateHeader extends CustomerHeader { }

export interface UpdateParams extends CustomerParams { }

export interface Crypto {
  active?: boolean
  address?: string
  chain?: string
  coin?: string
  id?: string
  offramp?: boolean
}

export interface CryptoResponseExampleVariant1 {
  data?: DataData
  message?: string
  status?: boolean
}

export interface DataData {
  account_id?: null
  account_name?: string
  account_number?: string
  active?: boolean
  address?: string
  amount?: number
  available_balance?: number
  bank_code?: string
  bank_name?: string
  chain?: string
  channel?: string
  coin?: string
  consent_url?: null
  consented?: boolean
  created_at?: string
  currency?: string
  customer?: null
  disabled?: boolean
  entry?: string
  eur?: null
  fee?: number
  hash?: string
  holding_balance?: number
  iban?: null
  id?: string
  ledger?: Ledger
  ledger_balance?: number
  offramp?: boolean
  reason?: string | null
  reference?: null
  require_consent?: boolean
  source?: Source
  status?: string
  summary?: string
  type?: string
  updated_at?: string
  wallet_type?: string
}

export type CryptoResponseExample =
  | CryptoResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CryptoInput {
  chain: string
  coin: string
  customer_id: string
  offramp?: boolean
}

export interface CryptoQuery extends CustomerQuery { }

export interface CryptoHeader extends CustomerHeader { }

export interface CryptoParams extends CustomerParams { }

export interface Transfer {
  account_number?: string
  address?: string
  amount?: number
  bank_code?: string
  chain?: string
  coin?: string
  created_at?: string
  currency?: string
  entry?: string
  fee?: number
  hash?: string
  id?: string
  meta?: Meta
  reason?: string
  reference?: string
  status?: string
  summary?: string
  type?: string
  updated_at?: string
}

export interface TransferResponseExampleVariant1 {
  account_number?: string
  amount?: number
  bank_code?: string
  currency?: string
  data?: DataData
  message?: string
  meta?: Meta
  reason?: string
  reference?: string
  status?: boolean
}

export type TransferResponseExample =
  | TransferResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface TransferInput {
  address: string
  amount: number
  chain: string
  coin: string
  funding_source?: string
  reason?: string
  reference?: string
}

export interface TransferQuery extends CustomerQuery { }

export interface TransferHeader extends CustomerHeader { }

export interface TransferParams extends CustomerParams { }

export type CryptoResponseExampleByAddressId =
  | CryptoResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CryptoByAddressIdParams {
  address_id: string
}

export interface Wallet extends Crypto { }

export interface WalletResponseExampleVariant1 {
  data?: DataData[]
  message?: string
  status?: boolean
}

export type WalletResponseExample =
  | WalletResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface WalletInput extends CustomerListInput { }

export interface WalletQuery extends CustomerQuery { }

export interface WalletHeader extends CustomerHeader { }

export interface WalletParams extends ActiveParams { }

export interface CryptoByIdInput {
  offramp: boolean
}

export interface VirtualAccount extends CustomerAccount { }

export interface VirtualAccountResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type VirtualAccountResponseExample =
  | VirtualAccountResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface VirtualAccountInput {
  currency: string
  customer_id: string
  preferred_bank?: string
}

export interface VirtualAccountQuery extends CustomerQuery { }

export interface VirtualAccountHeader extends CustomerHeader { }

export interface VirtualAccountParams extends CustomerParams { }

export interface Verify {
  account_id?: string
  amount?: number
  channel?: string
  created_at?: string
  currency?: string
  customer?: Customer
  entry?: string
  fee?: number
  id?: string
  reason?: null
  reference?: null
  source?: Source
  status?: string
  summary?: string
  type?: string
  updated_at?: string
}

export interface VerifyResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type VerifyResponseExample =
  | VerifyResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface VerifyInput extends CustomerListInput { }

export interface VerifyQuery extends CustomerQuery { }

export interface VerifyHeader extends CustomerHeader { }

export interface VerifyParams extends CustomerByIdParams { }

export interface Momo {
  amount?: number
  created_at?: string
  currency?: string
  entry?: string
  fee?: number
  id?: string
  otp_instruction?: OtpInstruction
  reason?: string
  reference?: string
  requires_otp?: boolean
  status?: string
  summary?: string
  type?: string
  updated_at?: string
}

export interface OtpInstruction {
  details?: string
  length?: number
}

export interface MomoResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type MomoResponseExample =
  | MomoResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface MomoInput {
  account_number: string
  amount: number
  bank_code: string
  currency: string
  description: string
  meta?: Meta
  reference?: string
}

export interface Counterparty {
  account_id?: string
  account_name?: string
  account_number?: string
  account_type?: null
  active?: boolean
  address?: string
  bank_code?: string
  bank_name?: string
  country?: string
  description?: string
  email?: string
  first_name?: string
  id?: string
  identity_type?: string
  institution_name?: string
  InstitutionName?: string
  last_name?: string
  name?: string
  payment_rail?: string[]
  payment_rails?: string[]
  phone_number?: string
}

export interface MomoQuery extends CustomerQuery { }

export interface MomoHeader extends CustomerHeader { }

export interface MomoParams extends CustomerParams { }

export interface VerifyOtp {
  amount?: number
  created_at?: string
  currency?: string
  entry?: string
  fee?: number
  id?: string
  reason?: string
  reference?: string
  status?: string
  summary?: string
  type?: string
  updated_at?: string
}

export interface VerifyOtpResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type VerifyOtpResponseExample =
  | VerifyOtpResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface VerifyOtpInput {
  otp: string
  transaction_id: string
}

export interface VerifyOtpQuery extends CustomerQuery { }

export interface VerifyOtpHeader extends CustomerHeader { }

export interface VerifyOtpParams extends CustomerParams { }

export interface Usd {
  amount?: number
  counterparty?: Counterparty
  created_at?: string
  currency?: string
  entry?: string
  fee?: number
  id?: string
  kyc_link?: string
  reason?: string
  reference?: string | null
  status?: string
  summary?: string
  type?: string
  updated_at?: string
}

export interface UsdResponseExampleVariant1 {
  data?: Usd
  message?: string
  status?: boolean
}

export type UsdResponseExample =
  | UsdResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface UsdInput {
  customer_id: string
  meta: MetaMeta
}

export interface MetaMeta {
  documents?: Document
  employer_name: string
  employment_description: string
  employment_status: string
  identification_number: string
  nationality: string
  occupation: string
  passport_number?: string
  us_residency_status: string
}

export interface Document {
  identification_country?: string
  identification_expiration?: string
  identification_image_back?: string
  identification_image_front?: string
  identification_type?: string
  proof_of_address?: ProofOfAddress
  source_of_funds?: ProofOfAddress
}

export interface ProofOfAddress {
  file?: string
  file_name?: string
}

export interface UsdQuery extends CustomerQuery { }

export interface UsdHeader extends CustomerHeader { }

export interface UsdParams extends CustomerParams { }

export interface VirtualAccountStatus {
  account_id?: string
  currency?: string
  kyc_link?: string
  message?: string[]
  reference?: string
  status?: string
}

export interface VirtualAccountStatusResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type VirtualAccountStatusResponseExample =
  | VirtualAccountStatusResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface VirtualAccountStatusInput extends CustomerListInput { }

export interface VirtualAccountStatusQuery extends CustomerQuery { }

export interface VirtualAccountStatusHeader extends CustomerHeader { }

export interface VirtualAccountStatusParams {
  reference: string
}

export interface VirtualAccountById {
  account_name?: string
  account_number?: string
  bank_name?: string
  consent_url?: null
  consented?: boolean
  created_at?: string
  currency?: string
  iban?: Iban[]
  id?: string
  reference?: null
  require_consent?: boolean
}

export interface Iban {
  account_holder_address?: string
  account_name?: string
  account_number?: string
  account_type?: string
  bank_name?: string
  institution_address?: string
  instruction_type?: string
  memo?: string
  routing_number?: string
  swift_code?: string
}

export type VirtualAccountResponseExampleById =
  | VirtualAccountResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface Rail {
  estimated_duration?: string
  name?: string
  rail?: string
}

export interface RailResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type RailResponseExample =
  | RailResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface RailInput extends CustomerListInput { }

export interface RailQuery extends CustomerQuery { }

export interface RailHeader extends CustomerHeader { }

export interface RailParams {
  account_id: string
}

export interface KycLink extends Active { }

export type KycLinkResponseExample = unknown

export interface KycLinkInput {
  customer_id: string
  redirect_url: string
}

export interface KycLinkQuery extends CustomerQuery { }

export interface KycLinkHeader extends CustomerHeader { }

export interface KycLinkParams extends CustomerParams { }

export interface CounterpartyResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type CounterpartyResponseExample =
  | CounterpartyResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CounterpartyInput {
  account_id: string
  account_information: AccountInformation
  beneficiary_address: BeneficiaryAddress
  business_name?: string
  description?: string
  email?: string
  first_name?: string
  is_corporate: boolean
  last_name?: string
  phone_number?: string
}

export interface AccountInformation {
  account_name: string
  account_number: string
  institution_address?: InstitutionAddress
  institution_name: string
  payment_rails: unknown[]
  routing_number: string
  swift_code?: string
  type: string
}

export interface InstitutionAddress {
  city?: string
  country?: string
  postal_code?: string
  state?: string
  street?: string
  unit_number?: string
}

export interface BeneficiaryAddress {
  city: string
  country: string
  postal_code: string
  state: string
  street: string
  unit_number?: string
}

export interface CounterpartyQuery extends CustomerQuery { }

export interface CounterpartyHeader extends CustomerHeader { }

export interface CounterpartyParams extends CustomerParams { }

export interface CounterpartyResponseExampleVariant1CounterpartyResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type CounterpartyResponseExampleByCounterPartyId =
  | CounterpartyResponseExampleVariant1CounterpartyResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CounterpartyByCounterPartyIdParams {
  counter_party_id: string
}

export type CounterpartyResponseExampleById =
  | CounterpartyResponseExampleVariant1CounterpartyResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface DynamicAccount extends Active { }

export interface DynamicAccountResponseExample {
  data?: DataData
  message?: string
  status?: boolean
}

export interface DynamicAccountInput {
  account_name: string
  amount?: string
  preferred_bank: string
}

export interface DynamicAccountQuery extends CustomerQuery { }

export interface DynamicAccountHeader extends CustomerHeader { }

export interface DynamicAccountParams extends CustomerParams { }

export interface Issuing {
  address?: Address
  auto_approve?: boolean
  balance?: number
  balance_updated_at?: string
  card_number?: null | string
  created_at?: string
  currency?: string
  cvv?: null | string
  expiry?: null | string
  id?: string
  issuer?: string
  masked_pan?: string
  name?: string
  reference?: string
  status?: string
  type?: string
  updated_at?: string
}

export interface IssuingResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type IssuingResponseExample =
  | IssuingResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface IssuingInput {
  amount?: number
  auto_approve: boolean
  brand?: string
  currency: string
  customer_id: string
  type: string
}

export interface IssuingQuery extends CustomerQuery { }

export interface IssuingHeader extends CustomerHeader { }

export interface IssuingParams extends CustomerParams { }

export interface IssuingResponseExampleVariant1IssuingResponseExampleVariant1 {
  data?: Data[]
  meta?: Meta
}

export type IssuingResponseExampleGetIssuing =
  | IssuingResponseExampleVariant1IssuingResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface IssuingGetIssuingQuery {
  brand?: string
  created_at?: string
  customer_id?: string
  page?: string
  page_size?: string
  status?: string
}

export interface Business {
  address?: Address
  auto_approve?: boolean
  balance?: number
  balance_updated_at?: string
  card_number?: string
  created_at?: string
  currency?: string
  cvv?: string
  expiry?: string
  id?: string
  issuer?: string
  masked_pan?: string
  name?: string
  status?: string
  type?: string
  updated_at?: string
}

export interface BusinessResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type BusinessResponseExample =
  | BusinessResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface BusinessInput {
  amount?: number
  auto_approve: boolean
  brand: string
  currency: string
  name: string
  type: string
}

export interface BusinessQuery extends CustomerQuery { }

export interface BusinessHeader extends CustomerHeader { }

export interface BusinessParams extends CustomerParams { }

export interface Fund {
  id?: string
}

export interface FundResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type FundResponseExample =
  | FundResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface FundInput {
  amount: number
}

export interface FundQuery extends CustomerQuery { }

export interface FundHeader extends CustomerHeader { }

export interface FundParams extends CustomerByIdParams { }

export interface Withdraw extends Fund { }

export type WithdrawResponseExample =
  | FundResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface WithdrawInput extends FundInput { }

export interface WithdrawQuery extends CustomerQuery { }

export interface WithdrawHeader extends CustomerHeader { }

export interface WithdrawParams extends CustomerByIdParams { }

export type IssuingResponseExampleById =
  | IssuingResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface IssuingTransaction {
  amount?: number
  created_at?: string
  currency?: string
  description?: string
  entry?: string
  id?: string
  merchant?: Merchant
  status?: string
}

export interface Merchant {
  city?: string
  country?: string
  name?: string
}

export interface IssuingTransactionResponseExampleVariant1 {
  data?: Data[]
  message?: string
  meta?: Meta
  status?: boolean
}

export type IssuingTransactionResponseExample =
  | IssuingTransactionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface IssuingTransactionInput extends CustomerListInput { }

export interface IssuingTransactionQuery {
  end_date?: string
  page?: string
  page_size?: string
  start_date?: string
}

export interface IssuingTransactionHeader extends CustomerHeader { }

export interface IssuingTransactionParams extends CustomerByIdParams { }

export interface Freeze extends Tier1 { }

export type FreezeResponseExample =
  | Tier1ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface FreezeInput extends CustomerListInput { }

export interface FreezeQuery extends CustomerQuery { }

export interface FreezeHeader extends CustomerHeader { }

export interface FreezeParams extends CustomerByIdParams { }

export interface Terminate extends Tier1 { }

export type TerminateResponseExample =
  | Tier1ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface TerminateInput extends CustomerListInput { }

export interface TerminateQuery extends CustomerQuery { }

export interface TerminateHeader extends CustomerHeader { }

export interface TerminateParams extends CustomerByIdParams { }

export interface Unfreeze extends Tier1 { }

export type UnfreezeResponseExample =
  | Tier1ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface UnfreezeInput extends CustomerListInput { }

export interface UnfreezeQuery extends CustomerQuery { }

export interface UnfreezeHeader extends CustomerHeader { }

export interface UnfreezeParams extends CustomerByIdParams { }

export interface Charge {
  card_id?: string
  card_transaction_id?: string
  channel?: string
  created_at?: string
  fee?: number
  reason?: string
}

export interface ChargeResponseExampleVariant1 {
  data?: Data[]
  message?: string
  meta?: Meta
  status?: boolean
}

export type ChargeResponseExample =
  | ChargeResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface ChargeInput extends CustomerListInput { }

export interface ChargeQuery {
  channel?: string
  end_date?: string
  page?: number
  page_size?: number
  search?: string
  start_date?: string
  transaction_id?: string
}

export interface ChargeHeader extends CustomerHeader { }

export interface ChargeParams extends CustomerParams { }

export interface Biller {
  commission?: number
  identifier?: string
  name?: string
}

export interface BillerResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type BillerResponseExample =
  | BillerResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface BillerInput extends CustomerListInput { }

export interface BillerQuery extends CustomerQuery { }

export interface BillerHeader extends CustomerHeader { }

export interface BillerParams {
  country: string
}

export type BillerResponseExampleByTypeAndCountry =
  | BillerResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface BillerByTypeAndCountryParams {
  country: string
  type: string
}

export interface Bundle {
  code?: string
  data?: string
  name?: string
  price?: number
  validity?: string
}

export interface BundleResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type BundleResponseExample =
  | BundleResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface BundleInput extends CustomerListInput { }

export interface BundleQuery extends CustomerQuery { }

export interface BundleHeader extends CustomerHeader { }

export interface BundleParams {
  bill_type: string
  biller: string
}

export interface Airtime {
  amount?: number
  commission_earned?: number
  created_at?: string
  debit_amount?: number
  id?: string
  network?: string
  phone_number?: string
}

export interface AirtimeResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type AirtimeResponseExample =
  | AirtimeResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface AirtimeInput {
  amount: number
  identifier: string
  phone_number: string
}

export interface AirtimeQuery extends CustomerQuery { }

export interface AirtimeHeader extends CustomerHeader { }

export interface AirtimeParams extends CustomerParams { }

export interface AirtimeResponseExampleVariant1AirtimeResponseExampleVariant1 {
  data?: Airtime[]
  message?: string
  status?: boolean
}

export type AirtimeResponseExampleBill =
  | AirtimeResponseExampleVariant1AirtimeResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface DataResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type DataResponseExample =
  | DataResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface DataInput {
  amount: number
  bundle_identifier: string
  identifier: string
  phone_number: string
}

export interface DataQuery extends CustomerQuery { }

export interface DataHeader extends CustomerHeader { }

export interface DataParams extends CustomerParams { }

export interface Cable {
  addons?: string[]
  amount?: number
  commission_earned?: number
  created_at?: string
  currency?: string
  debit_amount?: number
  duration?: number
  id?: string
  plan?: string
  provider?: string
  smartcard_number?: string
  status?: string
}

export interface CableResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type CableResponseExample =
  | CableResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CableInput {
  addons?: unknown[]
  amount: number
  duration?: string
  identifier: string
  serial_number: string
  subscription_id?: string
}

export interface CableQuery extends CustomerQuery { }

export interface CableHeader extends CustomerHeader { }

export interface CableParams extends CustomerParams { }

export interface Subscription {
  plan_id?: string
  subscription_plans?: SubscriptionPlan[]
  title?: string
}

export interface SubscriptionPlan {
  duration?: Duration
  price?: number
  subscription_id?: string
}

export interface Duration {
  type?: string
  value?: number
}

export interface SubscriptionResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type SubscriptionResponseExample =
  | SubscriptionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface SubscriptionInput extends CustomerListInput { }

export interface SubscriptionQuery extends CustomerQuery { }

export interface SubscriptionHeader extends CustomerHeader { }

export interface SubscriptionParams {
  biller_identifier: string
}

export interface Addon extends Active { }

export interface AddonResponseExample extends ActiveResponseExample { }

export interface AddonInput extends CustomerListInput { }

export interface AddonQuery extends CustomerQuery { }

export interface AddonHeader extends CustomerHeader { }

export interface AddonParams {
  addon_id: string
  biller: string
}

export interface Utility {
  account_number?: string
  amount?: number
  commission_earned?: number
  created_at?: string
  currency?: string
  debit_amount?: number
  id?: string
  network?: string
  status?: string
}

export interface UtilityResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type UtilityResponseExample =
  | UtilityResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface UtilityInput {
  account_number: string
  amount: number
  identifier: string
}

export interface UtilityQuery extends CustomerQuery { }

export interface UtilityHeader extends CustomerHeader { }

export interface UtilityParams extends CustomerParams { }

export interface ResolveAccount {
  identifier?: string
  meter_number?: string
  name?: string
}

export interface ResolveAccountResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type ResolveAccountResponseExample =
  | ResolveAccountResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface ResolveAccountInput {
  identifier: string
  meter_number: string
}

export interface ResolveAccountQuery extends CustomerQuery { }

export interface ResolveAccountHeader extends CustomerHeader { }

export interface ResolveAccountParams extends CustomerParams { }

export interface Electricity {
  amount?: number
  amount_of_power?: string
  commission_earned?: number
  configuration_token?: string
  created_at?: string
  currency?: string
  debit_amount?: number
  electricity_distributor?: string
  id?: string
  meter_number?: string
  reset_token?: string
  status?: string
  token?: string
  token_amount?: number
}

export interface ElectricityResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type ElectricityResponseExample =
  | ElectricityResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface ElectricityInput {
  amount: number
  identifier: string
  meter_number: string
  phone_number: string
}

export interface ElectricityQuery extends CustomerQuery { }

export interface ElectricityHeader extends CustomerHeader { }

export interface ElectricityParams extends CustomerParams { }

export interface Sender {
  address?: string
  country?: string
  first_name?: string
  last_name?: string
  phone_number?: string
}

export type TransferResponseExampleCreate =
  | TransferResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface TransferCreateInput {
  account_number: string
  amount: number
  bank_code: string
  currency: string
  meta?: Meta
  reason?: string
  reference?: string
}

export type UsdResponseExampleTransfer =
  | UsdResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface UsdTransferInput {
  amount: number
  counterparty_id: string
  memo: string
  payment_rail: string
  reason: string
  reference: string
}

export type TransferResponseExampleByTransferId =
  | TransferResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface TransferByTransferIdParams {
  transfer_id: string
}

export interface Transaction {
  account_id?: null
  amount?: number
  business_id?: string
  channel?: string
  created_at?: string
  CreatedAt?: string
  currency?: string
  customer?: null
  DeletedAt?: null
  destination_amount?: number
  destination_currency_id?: string
  entry?: string
  fee?: number
  id?: string
  ID?: string
  ledger?: Ledger
  meta?: null
  partner?: string
  reason?: null
  reference?: null
  source?: Source
  source_amount?: number
  source_currency_id?: string
  status?: string
  summary?: string
  type?: string
  updated_at?: string
  UpdatedAt?: string
}

export interface TransactionResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type TransactionResponseExample =
  | TransactionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface TransactionInput extends CustomerListInput { }

export interface TransactionQuery extends CustomerQuery { }

export interface TransactionHeader extends CustomerHeader { }

export interface TransactionParams extends CustomerParams { }

export interface Ledger {
  balance_type?: string
  created_at?: string
  credit?: number
  current_balance?: number
  debit?: number
  previous_balance?: number
  reversal?: boolean
  transaction_id?: string
  updated_at?: string
  wallet_id?: string
}

export interface TransactionResponseExampleVariant1TransactionResponseExampleVariant1 {
  data?: DataData
  message?: string
  status?: boolean
}

export type TransactionResponseExampleById =
  | TransactionResponseExampleVariant1TransactionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface Quote {
  rate?: number
  reference?: string
  source?: Source
  target?: Source
}

export interface QuoteResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type QuoteResponseExample =
  | QuoteResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface QuoteInput {
  amount: number
  source_currency: string
  target_currency: string
}

export interface QuoteQuery extends CustomerQuery { }

export interface QuoteHeader extends CustomerHeader { }

export interface QuoteParams extends CustomerParams { }

export interface Fx {
  rate?: number
  source?: Source
  target?: Source
}

export interface FxResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type FxResponseExample =
  | FxResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface FxInput {
  quote_reference: string
}

export interface FxQuery extends CustomerQuery { }

export interface FxHeader extends CustomerHeader { }

export interface FxParams extends CustomerParams { }

export interface Bvn {
  dob?: string
  first_name?: string
  gender?: string
  image?: string
  last_name?: string
  middle_name?: string
  phone_number?: string
}

export interface BvnResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type BvnResponseExample =
  | BvnResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface BvnInput {
  bvn: string
}

export interface BvnQuery extends CustomerQuery { }

export interface BvnHeader extends CustomerHeader { }

export interface BvnParams extends CustomerParams { }

export interface Institution {
  code?: string
  name?: string
}

export interface InstitutionResponseExampleVariant1 {
  data?: Data[]
  message?: string
  page?: number
  page_size?: number
  status?: boolean
  total?: number
}

export type InstitutionResponseExample =
  | InstitutionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface InstitutionInput extends CustomerListInput { }

export interface InstitutionQuery {
  country?: string
  page?: string
  page_size?: string
  type?: string
}

export interface InstitutionHeader extends CustomerHeader { }

export interface InstitutionParams extends CustomerParams { }

export interface Fetch {
  address?: Address
  institution_name?: string
  phone_number?: string
  routing_number?: string
}

export interface FetchResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type FetchResponseExample =
  | FetchResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface FetchInput {
  country_code: string
  routing_number: string
}

export interface FetchQuery extends CustomerQuery { }

export interface FetchHeader extends CustomerHeader { }

export interface FetchParams extends CustomerParams { }

export interface Resolve {
  account_name?: string
  account_number?: string
}

export interface ResolveResponseExampleVariant1 {
  data?: Data
  message?: string
  status?: boolean
}

export type ResolveResponseExample =
  | ResolveResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface ResolveInput {
  account_number: string
  bank_code: string
}

export interface ResolveQuery extends CustomerQuery { }

export interface ResolveHeader extends CustomerHeader { }

export interface ResolveParams extends CustomerParams { }

export interface Currency {
  currency?: string
  name?: string
  symbol?: string
}

export interface CurrencyResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type CurrencyResponseExample =
  | CurrencyResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CurrencyInput extends CustomerListInput { }

export interface CurrencyQuery extends CustomerQuery { }

export interface CurrencyHeader extends CustomerHeader { }

export interface CurrencyParams extends CustomerParams { }

export interface Country {
  calling_code?: string
  code?: string
  name?: string
}

export interface CountryResponseExampleVariant1 {
  data?: Data[]
  message?: string
  status?: boolean
}

export type CountryResponseExample =
  | CountryResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CountryInput extends CustomerListInput { }

export interface CountryQuery extends CustomerQuery { }

export interface CountryHeader extends CustomerHeader { }

export interface CountryParams extends CustomerParams { }

export interface WalletList {
  active?: boolean
  available_balance?: number
  currency?: string
  disabled?: boolean
  holding_balance?: number
  id?: string
  ledger_balance?: number
  wallet_type?: string
}

export type WalletResponseExampleList =
  | WalletResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface WalletHistory {
  balance_type?: string
  created_at?: string
  credit?: number
  current_balance?: number
  debit?: number
  previous_balance?: number
  related_transaction_id?: null
  reversal?: boolean
  transaction?: Transaction
  transaction_id?: string
  updated_at?: string
  wallet_id?: string
}

export interface WalletHistoryResponseExampleVariant1 {
  data?: WalletHistory[]
  message?: string
  meta?: Meta
  status?: boolean
}

export type WalletHistoryResponseExample =
  | WalletHistoryResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface WalletHistoryInput extends CustomerListInput { }

export interface WalletHistoryQuery extends IssuingTransactionQuery { }

export interface WalletHistoryHeader extends CustomerHeader { }

export interface WalletHistoryParams extends CustomerParams { }

export type WalletHistoryResponseExampleByCurrencyCode =
  | WalletHistoryResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface WalletHistoryByCurrencyCodeQuery {
  end_date?: string
  page?: number
  page_size?: number
  start_date?: string
}

export interface WalletHistoryByCurrencyCodeParams {
  currency_code: string
}

export interface Credit extends Tier1 { }

export type CreditResponseExample =
  | Tier1ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface CreditInput {
  amount: number
  currency: string
}

export interface CreditQuery extends CustomerQuery { }

export interface CreditHeader extends CustomerHeader { }

export interface CreditParams extends CustomerParams { }

export interface MockTransaction {
  amount?: number
  card_id?: string
  created_at?: string
  currency?: string
  description?: string
  event?: string
  reference?: null
  status?: string
  type?: string
  updated_at?: string
}

export interface MockTransactionResponseExampleVariant1 {
  amount?: number
  card_id?: string
  created_at?: string
  currency?: string
  description?: string
  event?: string
  reference?: null
  status?: string
  type?: string
  updated_at?: string
}

export type MockTransactionResponseExample =
  | MockTransactionResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface MockTransactionInput {
  amount: string
  type: string
}

export interface MockTransactionQuery extends CustomerQuery { }

export interface MockTransactionHeader extends CustomerHeader { }

export interface MockTransactionParams extends CustomerByIdParams { }

export type MockTransactionResponseExampleCollection =
  | Tier1ResponseExampleVariant1
  | CustomerResponseExampleVariant2

export interface MockTransactionCollectionInput {
  account_id?: string
  amount: string
  reference?: string
}

export interface OpenApiInfo {
  title: string
  version: string
}

export interface OpenApiSchemaDefinition {
  type?: string
  description?: string
  default?: unknown
  properties?: Record<string, OpenApiSchemaDefinition>
  items?: OpenApiSchemaDefinition
  required?: string[]
  example?: unknown
}

export interface OpenApiParameterDefinition {
  name: string
  in: 'query' | 'header' | 'path' | 'cookie'
  required?: boolean
  description?: string
  schema?: OpenApiSchemaDefinition
  example?: unknown
}

export interface OpenApiMediaTypeDefinition<TExample = unknown> {
  schema?: OpenApiSchemaDefinition
  example?: TExample
}

export interface OpenApiResponseDefinition<
  _TResponse = unknown,
  TExample = unknown,
> {
  description: string
  content?: Record<string, OpenApiMediaTypeDefinition<TExample>>
}

export interface OpenApiRequestBodyDefinition<TInput = unknown> {
  required: boolean
  content: Record<string, OpenApiMediaTypeDefinition<TInput>>
}

export interface OpenApiOperationDefinition<
  _TResponse = unknown,
  TResponseExample = unknown,
  TInput = Record<string, never>,
  _TQuery = Record<string, never>,
  _THeader = Record<string, never>,
  _TParams = Record<string, never>,
> {
  summary?: string
  description?: string
  operationId?: string
  parameters?: OpenApiParameterDefinition[]
  requestBody?: OpenApiRequestBodyDefinition<TInput>
  responses: Record<
    string,
    OpenApiResponseDefinition<_TResponse, TResponseExample>
  >
}

export interface OpenApiSdkParameterManifest {
  name: string
  accessor: string
  in: 'query' | 'header' | 'path'
  required: boolean
}

export interface OpenApiSdkOperationManifest {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  methodName: string
  summary?: string
  operationId?: string
  responseType: string
  inputType: string
  queryType: string
  headerType: string
  paramsType: string
  hasBody: boolean
  bodyRequired: boolean
  pathParams: OpenApiSdkParameterManifest[]
  queryParams: OpenApiSdkParameterManifest[]
  headerParams: OpenApiSdkParameterManifest[]
}

export interface OpenApiSdkGroupManifest {
  className: string
  propertyName: string
  operations: OpenApiSdkOperationManifest[]
}

export interface OpenApiSdkManifest {
  groups: OpenApiSdkGroupManifest[]
}

export interface OpenApiRuntimeBundle<TApi = unknown> {
  document: unknown
  manifest: OpenApiSdkManifest
  __api?: TApi
}

export interface CustomersPathPostOperation extends OpenApiOperationDefinition<
  Customer,
  CustomerResponseExample,
  CustomerInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CustomersPathGetOperation extends OpenApiOperationDefinition<
  Customer,
  CustomerResponseExampleList,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CustomersPath {
  post: CustomersPathPostOperation
  get: CustomersPathGetOperation
}

export interface CustomersUpgradeTier1PathPatchOperation extends OpenApiOperationDefinition<
  Tier1,
  Tier1ResponseExample,
  Tier1Input,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CustomersUpgradeTier1Path {
  patch: CustomersUpgradeTier1PathPatchOperation
}

export interface CustomersUpgradeTier2PathPatchOperation extends OpenApiOperationDefinition<
  Tier2,
  Tier2ResponseExample,
  Tier2Input,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CustomersUpgradeTier2Path {
  patch: CustomersUpgradeTier2PathPatchOperation
}

export interface CustomersEnrollPathPostOperation extends OpenApiOperationDefinition<
  Customer,
  EnrollResponseExample,
  EnrollInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CustomersEnrollPath {
  post: CustomersEnrollPathPostOperation
}

export interface CustomersByCustomerIdActivePathPostOperation extends OpenApiOperationDefinition<
  Active,
  ActiveResponseExample,
  ActiveInput,
  CustomerQuery,
  CustomerHeader,
  ActiveParams
> { }

export interface CustomersByCustomerIdActivePath {
  post: CustomersByCustomerIdActivePathPostOperation
}

export interface CustomersByIdPathGetOperation extends OpenApiOperationDefinition<
  Customer,
  CustomerResponseExampleById,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface CustomersByIdPath {
  get: CustomersByIdPathGetOperation
}

export interface CustomersByIdAccountsPathGetOperation extends OpenApiOperationDefinition<
  CustomerAccount,
  CustomerAccountResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface CustomersByIdAccountsPath {
  get: CustomersByIdAccountsPathGetOperation
}

export interface CustomersByIdTransactionsPathGetOperation extends OpenApiOperationDefinition<
  CustomerTransaction,
  CustomerTransactionResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface CustomersByIdTransactionsPath {
  get: CustomersByIdTransactionsPathGetOperation
}

export interface CustomersByCustomerIdVirtualAccountPathGetOperation extends OpenApiOperationDefinition<
  CustomerAccount,
  CustomerVirtualAccountResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  ActiveParams
> { }

export interface CustomersByCustomerIdVirtualAccountPath {
  get: CustomersByCustomerIdVirtualAccountPathGetOperation
}

export interface CustomersUpdatePathPatchOperation extends OpenApiOperationDefinition<
  Active,
  ActiveResponseExample,
  UpdateInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CustomersUpdatePath {
  patch: CustomersUpdatePathPatchOperation
}

export interface CryptoPathPostOperation extends OpenApiOperationDefinition<
  Crypto,
  CryptoResponseExample,
  CryptoInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CryptoPath {
  post: CryptoPathPostOperation
}

export interface CryptoTransferPathPostOperation extends OpenApiOperationDefinition<
  Transfer,
  TransferResponseExample,
  TransferInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CryptoTransferPath {
  post: CryptoTransferPathPostOperation
}

export interface CryptoByAddressIdPathGetOperation extends OpenApiOperationDefinition<
  Crypto,
  CryptoResponseExampleByAddressId,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CryptoByAddressIdParams
> { }

export interface CryptoByAddressIdPath {
  get: CryptoByAddressIdPathGetOperation
}

export interface CryptoWalletsByCustomerIdPathGetOperation extends OpenApiOperationDefinition<
  Crypto,
  WalletResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  ActiveParams
> { }

export interface CryptoWalletsByCustomerIdPath {
  get: CryptoWalletsByCustomerIdPathGetOperation
}

export interface CryptoByIdPathPatchOperation extends OpenApiOperationDefinition<
  Active,
  ActiveResponseExample,
  CryptoByIdInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface CryptoByIdPath {
  patch: CryptoByIdPathPatchOperation
}

export interface CollectionsVirtualAccountPathPostOperation extends OpenApiOperationDefinition<
  CustomerAccount,
  VirtualAccountResponseExample,
  VirtualAccountInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsVirtualAccountPath {
  post: CollectionsVirtualAccountPathPostOperation
}

export interface TransactionsVerifyByIdPathGetOperation extends OpenApiOperationDefinition<
  Verify,
  VerifyResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface TransactionsVerifyByIdPath {
  get: TransactionsVerifyByIdPathGetOperation
}

export interface CollectionsMomoPathPostOperation extends OpenApiOperationDefinition<
  Momo,
  MomoResponseExample,
  MomoInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsMomoPath {
  post: CollectionsMomoPathPostOperation
}

export interface CollectionsMomoVerifyOtpPathPostOperation extends OpenApiOperationDefinition<
  VerifyOtp,
  VerifyOtpResponseExample,
  VerifyOtpInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsMomoVerifyOtpPath {
  post: CollectionsMomoVerifyOtpPathPostOperation
}

export interface CollectionsVirtualAccountUsdPathPostOperation extends OpenApiOperationDefinition<
  Usd,
  UsdResponseExample,
  UsdInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsVirtualAccountUsdPath {
  post: CollectionsVirtualAccountUsdPathPostOperation
}

export interface CollectionsVirtualAccountStatusByReferencePathGetOperation extends OpenApiOperationDefinition<
  VirtualAccountStatus,
  VirtualAccountStatusResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  VirtualAccountStatusParams
> { }

export interface CollectionsVirtualAccountStatusByReferencePath {
  get: CollectionsVirtualAccountStatusByReferencePathGetOperation
}

export interface CollectionsVirtualAccountByIdPathGetOperation extends OpenApiOperationDefinition<
  VirtualAccountById,
  VirtualAccountResponseExampleById,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface CollectionsVirtualAccountByIdPath {
  get: CollectionsVirtualAccountByIdPathGetOperation
}

export interface CollectionsVirtualAccountByAccountIdRailsPathGetOperation extends OpenApiOperationDefinition<
  Rail,
  RailResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  RailParams
> { }

export interface CollectionsVirtualAccountByAccountIdRailsPath {
  get: CollectionsVirtualAccountByAccountIdRailsPathGetOperation
}

export interface CollectionsUsdKycLinkPathPostOperation extends OpenApiOperationDefinition<
  Active,
  KycLinkResponseExample,
  KycLinkInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsUsdKycLinkPath {
  post: CollectionsUsdKycLinkPathPostOperation
}

export interface CollectionsVirtualAccountCounterpartiesPathPostOperation extends OpenApiOperationDefinition<
  Counterparty,
  CounterpartyResponseExample,
  CounterpartyInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsVirtualAccountCounterpartiesPath {
  post: CollectionsVirtualAccountCounterpartiesPathPostOperation
}

export interface CollectionsVirtualAccountCounterpartiesByCounterPartyIdPathGetOperation extends OpenApiOperationDefinition<
  Counterparty,
  CounterpartyResponseExampleByCounterPartyId,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CounterpartyByCounterPartyIdParams
> { }

export interface CollectionsVirtualAccountCounterpartiesByCounterPartyIdPath {
  get: CollectionsVirtualAccountCounterpartiesByCounterPartyIdPathGetOperation
}

export interface CollectionsVirtualAccountByIdCounterpartiesPathGetOperation extends OpenApiOperationDefinition<
  Counterparty,
  CounterpartyResponseExampleById,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface CollectionsVirtualAccountByIdCounterpartiesPath {
  get: CollectionsVirtualAccountByIdCounterpartiesPathGetOperation
}

export interface CollectionsDynamicAccountPathPostOperation extends OpenApiOperationDefinition<
  Active,
  DynamicAccountResponseExample,
  DynamicAccountInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CollectionsDynamicAccountPath {
  post: CollectionsDynamicAccountPathPostOperation
}

export interface IssuingPathPostOperation extends OpenApiOperationDefinition<
  Issuing,
  IssuingResponseExample,
  IssuingInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface IssuingPathGetOperation extends OpenApiOperationDefinition<
  Issuing,
  IssuingResponseExampleGetIssuing,
  CustomerListInput,
  IssuingGetIssuingQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface IssuingPath {
  post: IssuingPathPostOperation
  get: IssuingPathGetOperation
}

export interface IssuingBusinessPathPostOperation extends OpenApiOperationDefinition<
  Business,
  BusinessResponseExample,
  BusinessInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface IssuingBusinessPath {
  post: IssuingBusinessPathPostOperation
}

export interface IssuingByIdFundPathPostOperation extends OpenApiOperationDefinition<
  Fund,
  FundResponseExample,
  FundInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdFundPath {
  post: IssuingByIdFundPathPostOperation
}

export interface IssuingByIdWithdrawPathPostOperation extends OpenApiOperationDefinition<
  Fund,
  WithdrawResponseExample,
  FundInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdWithdrawPath {
  post: IssuingByIdWithdrawPathPostOperation
}

export interface IssuingByIdPathGetOperation extends OpenApiOperationDefinition<
  Issuing,
  IssuingResponseExampleById,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdPath {
  get: IssuingByIdPathGetOperation
}

export interface IssuingByIdTransactionsPathGetOperation extends OpenApiOperationDefinition<
  IssuingTransaction,
  IssuingTransactionResponseExample,
  CustomerListInput,
  IssuingTransactionQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdTransactionsPath {
  get: IssuingByIdTransactionsPathGetOperation
}

export interface IssuingByIdFreezePathPatchOperation extends OpenApiOperationDefinition<
  Tier1,
  FreezeResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdFreezePath {
  patch: IssuingByIdFreezePathPatchOperation
}

export interface IssuingByIdTerminatePathPutOperation extends OpenApiOperationDefinition<
  Tier1,
  TerminateResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdTerminatePath {
  put: IssuingByIdTerminatePathPutOperation
}

export interface IssuingByIdUnfreezePathPatchOperation extends OpenApiOperationDefinition<
  Tier1,
  UnfreezeResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface IssuingByIdUnfreezePath {
  patch: IssuingByIdUnfreezePathPatchOperation
}

export interface IssuingChargesPathGetOperation extends OpenApiOperationDefinition<
  Charge,
  ChargeResponseExample,
  CustomerListInput,
  ChargeQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface IssuingChargesPath {
  get: IssuingChargesPathGetOperation
}

export interface BillsAirtimeBillersByCountryPathGetOperation extends OpenApiOperationDefinition<
  Biller,
  BillerResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  BillerParams
> { }

export interface BillsAirtimeBillersByCountryPath {
  get: BillsAirtimeBillersByCountryPathGetOperation
}

export interface BillsByTypeBillersByCountryPathGetOperation extends OpenApiOperationDefinition<
  Biller,
  BillerResponseExampleByTypeAndCountry,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  BillerByTypeAndCountryParams
> { }

export interface BillsByTypeBillersByCountryPath {
  get: BillsByTypeBillersByCountryPathGetOperation
}

export interface BillsByBillTypeBundleByBillerPathGetOperation extends OpenApiOperationDefinition<
  Bundle,
  BundleResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  BundleParams
> { }

export interface BillsByBillTypeBundleByBillerPath {
  get: BillsByBillTypeBundleByBillerPathGetOperation
}

export interface BillsAirtimePathPostOperation extends OpenApiOperationDefinition<
  Airtime,
  AirtimeResponseExample,
  AirtimeInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsAirtimePathGetOperation extends OpenApiOperationDefinition<
  Airtime,
  AirtimeResponseExampleBill,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsAirtimePath {
  post: BillsAirtimePathPostOperation
  get: BillsAirtimePathGetOperation
}

export interface BillsDataPathPostOperation extends OpenApiOperationDefinition<
  Data,
  DataResponseExample,
  DataInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsDataPath {
  post: BillsDataPathPostOperation
}

export interface BillsCablePathPostOperation extends OpenApiOperationDefinition<
  Cable,
  CableResponseExample,
  CableInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsCablePath {
  post: BillsCablePathPostOperation
}

export interface BillsCableSubscriptionsByBillerIdentifierPathGetOperation extends OpenApiOperationDefinition<
  Subscription,
  SubscriptionResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  SubscriptionParams
> { }

export interface BillsCableSubscriptionsByBillerIdentifierPath {
  get: BillsCableSubscriptionsByBillerIdentifierPathGetOperation
}

export interface BillsCableAddonByBillerByAddonIdPathGetOperation extends OpenApiOperationDefinition<
  Active,
  ActiveResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  AddonParams
> { }

export interface BillsCableAddonByBillerByAddonIdPath {
  get: BillsCableAddonByBillerByAddonIdPathGetOperation
}

export interface BillsUtilityPathPostOperation extends OpenApiOperationDefinition<
  Utility,
  UtilityResponseExample,
  UtilityInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsUtilityPath {
  post: BillsUtilityPathPostOperation
}

export interface BillsElectricityResolveAccountPathPostOperation extends OpenApiOperationDefinition<
  ResolveAccount,
  ResolveAccountResponseExample,
  ResolveAccountInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsElectricityResolveAccountPath {
  post: BillsElectricityResolveAccountPathPostOperation
}

export interface BillsElectricityPathPostOperation extends OpenApiOperationDefinition<
  Electricity,
  ElectricityResponseExample,
  ElectricityInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface BillsElectricityPath {
  post: BillsElectricityPathPostOperation
}

export interface TransfersPathPostOperation extends OpenApiOperationDefinition<
  Transfer,
  TransferResponseExampleCreate,
  TransferCreateInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface TransfersPath {
  post: TransfersPathPostOperation
}

export interface TransfersUsdPathPostOperation extends OpenApiOperationDefinition<
  Usd,
  UsdResponseExampleTransfer,
  UsdTransferInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface TransfersUsdPath {
  post: TransfersUsdPathPostOperation
}

export interface TransfersByTransferIdPathGetOperation extends OpenApiOperationDefinition<
  Transfer,
  TransferResponseExampleByTransferId,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  TransferByTransferIdParams
> { }

export interface TransfersByTransferIdPath {
  get: TransfersByTransferIdPathGetOperation
}

export interface TransactionsPathGetOperation extends OpenApiOperationDefinition<
  Transaction,
  TransactionResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface TransactionsPath {
  get: TransactionsPathGetOperation
}

export interface TransactionsByIdPathGetOperation extends OpenApiOperationDefinition<
  Transaction,
  TransactionResponseExampleById,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface TransactionsByIdPath {
  get: TransactionsByIdPathGetOperation
}

export interface FxQuotePathPostOperation extends OpenApiOperationDefinition<
  Quote,
  QuoteResponseExample,
  QuoteInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface FxQuotePath {
  post: FxQuotePathPostOperation
}

export interface FxPathPostOperation extends OpenApiOperationDefinition<
  Fx,
  FxResponseExample,
  FxInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface FxPathGetOperation extends OpenApiOperationDefinition<
  Active,
  ActiveResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface FxPath {
  post: FxPathPostOperation
  get: FxPathGetOperation
}

export interface IdentityBvnPathPostOperation extends OpenApiOperationDefinition<
  Bvn,
  BvnResponseExample,
  BvnInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface IdentityBvnPath {
  post: IdentityBvnPathPostOperation
}

export interface InstitutionsPathGetOperation extends OpenApiOperationDefinition<
  Institution,
  InstitutionResponseExample,
  CustomerListInput,
  InstitutionQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface InstitutionsPath {
  get: InstitutionsPathGetOperation
}

export interface InstitutionsFetchPathPostOperation extends OpenApiOperationDefinition<
  Fetch,
  FetchResponseExample,
  FetchInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface InstitutionsFetchPath {
  post: InstitutionsFetchPathPostOperation
}

export interface InstitutionsResolvePathPostOperation extends OpenApiOperationDefinition<
  Resolve,
  ResolveResponseExample,
  ResolveInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface InstitutionsResolvePath {
  post: InstitutionsResolvePathPostOperation
}

export interface CurrenciesPathGetOperation extends OpenApiOperationDefinition<
  Currency,
  CurrencyResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CurrenciesPath {
  get: CurrenciesPathGetOperation
}

export interface CountriesPathGetOperation extends OpenApiOperationDefinition<
  Country,
  CountryResponseExample,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface CountriesPath {
  get: CountriesPathGetOperation
}

export interface WalletsPathGetOperation extends OpenApiOperationDefinition<
  WalletList,
  WalletResponseExampleList,
  CustomerListInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface WalletsPath {
  get: WalletsPathGetOperation
}

export interface WalletsHistoryPathGetOperation extends OpenApiOperationDefinition<
  WalletHistory,
  WalletHistoryResponseExample,
  CustomerListInput,
  IssuingTransactionQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface WalletsHistoryPath {
  get: WalletsHistoryPathGetOperation
}

export interface WalletsByCurrencyCodeHistoryPathGetOperation extends OpenApiOperationDefinition<
  WalletHistory,
  WalletHistoryResponseExampleByCurrencyCode,
  CustomerListInput,
  WalletHistoryByCurrencyCodeQuery,
  CustomerHeader,
  WalletHistoryByCurrencyCodeParams
> { }

export interface WalletsByCurrencyCodeHistoryPath {
  get: WalletsByCurrencyCodeHistoryPathGetOperation
}

export interface TestWalletCreditPathPostOperation extends OpenApiOperationDefinition<
  Tier1,
  CreditResponseExample,
  CreditInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface TestWalletCreditPath {
  post: TestWalletCreditPathPostOperation
}

export interface TestIssuingByIdMockTransactionPathPostOperation extends OpenApiOperationDefinition<
  MockTransaction,
  MockTransactionResponseExample,
  MockTransactionInput,
  CustomerQuery,
  CustomerHeader,
  CustomerByIdParams
> { }

export interface TestIssuingByIdMockTransactionPath {
  post: TestIssuingByIdMockTransactionPathPostOperation
}

export interface TestCollectionMockTransactionPathPostOperation extends OpenApiOperationDefinition<
  Tier1,
  MockTransactionResponseExampleCollection,
  MockTransactionCollectionInput,
  CustomerQuery,
  CustomerHeader,
  CustomerParams
> { }

export interface TestCollectionMockTransactionPath {
  post: TestCollectionMockTransactionPathPostOperation
}

export interface Paths {
  '/v1/customers': CustomersPath
  '/v1/customers/upgrade/tier1': CustomersUpgradeTier1Path
  '/v1/customers/upgrade/tier2': CustomersUpgradeTier2Path
  '/v1/customers/enroll': CustomersEnrollPath
  '/v1/customers/{customer_id}/active': CustomersByCustomerIdActivePath
  '/v1/customers/{id}': CustomersByIdPath
  '/v1/customers/{id}/accounts': CustomersByIdAccountsPath
  '/v1/customers/{id}/transactions': CustomersByIdTransactionsPath
  '/v1/customers/{customer_id}/virtual-account': CustomersByCustomerIdVirtualAccountPath
  '/v1/customers/update': CustomersUpdatePath
  '/v1/crypto': CryptoPath
  '/v1/crypto/transfer': CryptoTransferPath
  '/v1/crypto/{address_id}': CryptoByAddressIdPath
  '/v1/crypto/wallets/{customer_id}': CryptoWalletsByCustomerIdPath
  '/v1/crypto/:id': CryptoByIdPath
  '/v1/collections/virtual-account': CollectionsVirtualAccountPath
  '/v1/transactions/verify/{id}': TransactionsVerifyByIdPath
  '/v1/collections/momo': CollectionsMomoPath
  '/v1/collections/momo/verify-otp': CollectionsMomoVerifyOtpPath
  '/v1/collections/virtual-account/usd': CollectionsVirtualAccountUsdPath
  '/v1/collections/virtual-account/status/{reference}': CollectionsVirtualAccountStatusByReferencePath
  '/v1/collections/virtual-account/{id}': CollectionsVirtualAccountByIdPath
  '/v1/collections/virtual-account/{account_id}/rails': CollectionsVirtualAccountByAccountIdRailsPath
  '/v1/collections/usd/kyc_link': CollectionsUsdKycLinkPath
  '/v1/collections/virtual-account/counterparties': CollectionsVirtualAccountCounterpartiesPath
  '/v1/collections/virtual-account/counterparties/{counter_party_id}': CollectionsVirtualAccountCounterpartiesByCounterPartyIdPath
  '/v1/collections/virtual-account/{id}/counterparties': CollectionsVirtualAccountByIdCounterpartiesPath
  '/v1/collections/dynamic-account': CollectionsDynamicAccountPath
  '/v1/issuing': IssuingPath
  '/v1/issuing/business': IssuingBusinessPath
  '/v1/issuing/{id}/fund': IssuingByIdFundPath
  '/v1/issuing/{id}/withdraw': IssuingByIdWithdrawPath
  '/v1/issuing/{id}': IssuingByIdPath
  '/v1/issuing/{id}/transactions': IssuingByIdTransactionsPath
  '/v1/issuing/{id}/freeze': IssuingByIdFreezePath
  '/v1/issuing/{id}/terminate': IssuingByIdTerminatePath
  '/v1/issuing/{id}/unfreeze': IssuingByIdUnfreezePath
  '/v1/issuing/charges': IssuingChargesPath
  '/v1/bills/airtime/billers/{country}': BillsAirtimeBillersByCountryPath
  '/v1/bills/{type}/billers/{country}': BillsByTypeBillersByCountryPath
  '/v1/bills/{bill_type}/bundle/{biller}': BillsByBillTypeBundleByBillerPath
  '/v1/bills/airtime': BillsAirtimePath
  '/v1/bills/data': BillsDataPath
  '/v1/bills/cable': BillsCablePath
  '/v1/bills/cable/subscriptions/{biller_identifier}': BillsCableSubscriptionsByBillerIdentifierPath
  '/v1/bills/cable/addon/{biller}/{addon_id}': BillsCableAddonByBillerByAddonIdPath
  '/v1/bills/utility': BillsUtilityPath
  '/v1/bills/electricity/resolve-account': BillsElectricityResolveAccountPath
  '/v1/bills/electricity': BillsElectricityPath
  '/v1/transfers': TransfersPath
  '/v2/transfers/usd': TransfersUsdPath
  '/v1/transfers/{transfer_id}': TransfersByTransferIdPath
  '/v1/transactions': TransactionsPath
  '/v1/transactions/{id}': TransactionsByIdPath
  '/v1/fx/quote': FxQuotePath
  '/v1/fx': FxPath
  '/v1/identity/bvn': IdentityBvnPath
  '/v1/institutions': InstitutionsPath
  '/v1/institutions/fetch': InstitutionsFetchPath
  '/v1/institutions/resolve': InstitutionsResolvePath
  '/v1/currencies': CurrenciesPath
  '/v1/countries': CountriesPath
  '/v1/wallets': WalletsPath
  '/v1/wallets/history': WalletsHistoryPath
  '/v1/wallets/{currency_code}/history': WalletsByCurrencyCodeHistoryPath
  '/v1/test/wallet/credit': TestWalletCreditPath
  '/v1/test/issuing/{id}/mock-transaction': TestIssuingByIdMockTransactionPath
  '/v1/test/collection/mock-transaction': TestCollectionMockTransactionPath
}

export interface ExtractedApiDocument {
  openapi: '3.1.0'
  info: OpenApiInfo
  paths: Paths
}

export interface ExtractedApiDocumentApi {
  activeCustomers: {
    create (params: ActiveParams, body: ActiveInput): Promise<Active>
  }
  addonCables: {
    get (params: AddonParams): Promise<Active>
  }
  airtimeBills: {
    create (body: AirtimeInput): Promise<Airtime>
    list (): Promise<Airtime[]>
  }
  billBillers: {
    get (params: BillerByTypeAndCountryParams): Promise<Biller[]>
  }
  billers: {
    get (params: BillerParams): Promise<Biller[]>
  }
  bundleBills: {
    get (params: BundleParams): Promise<Bundle[]>
  }
  businessIssuings: {
    create (body: BusinessInput): Promise<Business>
  }
  bvnIdentities: {
    create (body: BvnInput): Promise<Bvn>
  }
  cableBills: {
    create (body: CableInput): Promise<Cable>
  }
  chargeIssuings: {
    list (query: ChargeQuery): Promise<Charge[]>
  }
  counterparties: {
    create (body: CounterpartyInput): Promise<Counterparty>
    get (params: CounterpartyByCounterPartyIdParams): Promise<Counterparty[]>
    list (params: CustomerByIdParams): Promise<Counterparty[]>
  }
  countries: {
    list (): Promise<Country[]>
  }
  credits: {
    create (body: CreditInput): Promise<Tier1>
  }
  cryptos: {
    create (body: CryptoInput): Promise<Crypto>
    get (params: CryptoByAddressIdParams): Promise<Crypto>
    update (params: CustomerByIdParams, body: CryptoByIdInput): Promise<Active>
  }
  cryptoWallets: {
    get (params: ActiveParams): Promise<Crypto[]>
  }
  currencies: {
    list (): Promise<Currency[]>
  }
  customerAccounts: {
    list (params: CustomerByIdParams): Promise<CustomerAccount[]>
  }
  customers: {
    create (body: CustomerInput): Promise<Customer>
    list (query: CustomerQuery): Promise<Customer[]>
    get (params: CustomerByIdParams): Promise<Customer>
  }
  customerTransactions: {
    list (params: CustomerByIdParams): Promise<CustomerTransaction[]>
  }
  dataBills: {
    create (body: DataInput): Promise<Data>
  }
  dynamicAccountCollections: {
    create (body: DynamicAccountInput): Promise<Active>
  }
  electricityBills: {
    create (body: ElectricityInput): Promise<Electricity>
  }
  enrollCustomers: {
    create (body: EnrollInput): Promise<Customer>
  }
  fetchInstitutions: {
    create (body: FetchInput): Promise<Fetch>
  }
  freezeIssuings: {
    update (params: CustomerByIdParams): Promise<Tier1>
  }
  fundIssuings: {
    create (params: CustomerByIdParams, body: FundInput): Promise<Fund>
  }
  fxs: {
    create (body: FxInput): Promise<Fx>
    list (): Promise<Active>
  }
  historyWallets: {
    list (query: IssuingTransactionQuery): Promise<WalletHistory[]>
    get (
      params: WalletHistoryByCurrencyCodeParams,
      query: WalletHistoryByCurrencyCodeQuery,
    ): Promise<WalletHistory[]>
  }
  institutions: {
    list (query: InstitutionQuery): Promise<Institution[]>
  }
  issuings: {
    create (body: IssuingInput): Promise<Issuing>
    list (query: IssuingGetIssuingQuery): Promise<Issuing[]>
    get (params: CustomerByIdParams): Promise<Issuing>
  }
  issuingTransactions: {
    list (
      params: CustomerByIdParams,
      query: IssuingTransactionQuery,
    ): Promise<IssuingTransaction[]>
  }
  kycLinks: {
    create (body: KycLinkInput): Promise<Active>
  }
  mockTransactionIssuings: {
    create (
      params: CustomerByIdParams,
      body: MockTransactionInput,
    ): Promise<MockTransaction>
  }
  mockTransactions: {
    create (body: MockTransactionCollectionInput): Promise<Tier1>
  }
  momoCollections: {
    create (body: MomoInput): Promise<Momo>
  }
  quoteFxs: {
    create (body: QuoteInput): Promise<Quote>
  }
  resolveAccounts: {
    create (body: ResolveAccountInput): Promise<ResolveAccount>
  }
  resolveInstitutions: {
    create (body: ResolveInput): Promise<Resolve>
  }
  virtualAccountStatus: {
    get (params: VirtualAccountStatusParams): Promise<VirtualAccountStatus>
  }
  subscriptions: {
    get (params: SubscriptionParams): Promise<Subscription[]>
  }
  terminateIssuings: {
    update (params: CustomerByIdParams): Promise<Tier1>
  }
  tier1s: {
    update (body: Tier1Input): Promise<Tier1>
  }
  tier2s: {
    update (body: Tier2Input): Promise<Tier2>
  }
  transactions: {
    list (): Promise<Transaction[]>
    get (params: CustomerByIdParams): Promise<Transaction>
  }
  transferCryptos: {
    create (body: TransferInput): Promise<Transfer>
  }
  transfers: {
    create (body: TransferCreateInput): Promise<Transfer>
    get (params: TransferByTransferIdParams): Promise<Transfer>
  }
  unfreezeIssuings: {
    update (params: CustomerByIdParams): Promise<Tier1>
  }
  updateCustomers: {
    update (body: UpdateInput): Promise<Active>
  }
  usds: {
    create (body: UsdInput): Promise<Usd>
  }
  usdTransfers: {
    create (body: UsdTransferInput): Promise<Usd>
  }
  utilityBills: {
    create (body: UtilityInput): Promise<Utility>
  }
  verifies: {
    get (params: CustomerByIdParams): Promise<Verify>
  }
  verifyOtps: {
    create (body: VerifyOtpInput): Promise<VerifyOtp>
  }
  virtualAccountCollections: {
    create (body: VirtualAccountInput): Promise<CustomerAccount>
    get (params: CustomerByIdParams): Promise<VirtualAccountById>
  }
  virtualAccountCustomers: {
    get (params: ActiveParams): Promise<CustomerAccount[]>
  }
  virtualAccountRails: {
    list (params: RailParams): Promise<Rail[]>
  }
  wallets: {
    list (): Promise<WalletList[]>
  }
  withdrawIssuings: {
    create (params: CustomerByIdParams, body: FundInput): Promise<Fund>
  }
}

export const extractedApiDocumentManifest = {
  groups: [
    {
      className: 'ActiveCustomer',
      propertyName: 'activeCustomers',
      operations: [
        {
          path: '/v1/customers/{customer_id}/active',
          method: 'POST',
          methodName: 'create',
          summary: 'Whitelist/Blacklist a Customer',
          operationId: 'postV1CustomersCustomerIdActive',
          responseType: 'Active',
          inputType: 'ActiveInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'ActiveParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [
            {
              name: 'customer_id',
              accessor: 'customerId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'AddonCable',
      propertyName: 'addonCables',
      operations: [
        {
          path: '/v1/bills/cable/addon/{biller}/{addon_id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Cable Addons',
          operationId: 'getV1BillsCableAddonBillerAddonId',
          responseType: 'Active',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'AddonParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'addon_id',
              accessor: 'addonId',
              in: 'path',
              required: true,
            },
            {
              name: 'biller',
              accessor: 'biller',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'AirtimeBill',
      propertyName: 'airtimeBills',
      operations: [
        {
          path: '/v1/bills/airtime',
          method: 'POST',
          methodName: 'create',
          summary: 'Buy Airtime',
          operationId: 'postV1BillsAirtime',
          responseType: 'Airtime',
          inputType: 'AirtimeInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/bills/airtime',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Airtime History',
          operationId: 'getV1BillsAirtime',
          responseType: 'Airtime[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'BillBiller',
      propertyName: 'billBillers',
      operations: [
        {
          path: '/v1/bills/{type}/billers/{country}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Billers By Type and Country',
          operationId: 'getV1BillsTypeBillersCountry',
          responseType: 'Biller[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'BillerByTypeAndCountryParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'country',
              accessor: 'country',
              in: 'path',
              required: true,
            },
            {
              name: 'type',
              accessor: 'type',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Biller',
      propertyName: 'billers',
      operations: [
        {
          path: '/v1/bills/airtime/billers/{country}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Billers',
          operationId: 'getV1BillsAirtimeBillersCountry',
          responseType: 'Biller[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'BillerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'country',
              accessor: 'country',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'BundleBill',
      propertyName: 'bundleBills',
      operations: [
        {
          path: '/v1/bills/{bill_type}/bundle/{biller}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Available Bundles',
          operationId: 'getV1BillsBillTypeBundleBiller',
          responseType: 'Bundle[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'BundleParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'bill_type',
              accessor: 'billType',
              in: 'path',
              required: true,
            },
            {
              name: 'biller',
              accessor: 'biller',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'BusinessIssuing',
      propertyName: 'businessIssuings',
      operations: [
        {
          path: '/v1/issuing/business',
          method: 'POST',
          methodName: 'create',
          summary: 'Create a Business Card',
          operationId: 'postV1IssuingBusiness',
          responseType: 'Business',
          inputType: 'BusinessInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'BvnIdentity',
      propertyName: 'bvnIdentities',
      operations: [
        {
          path: '/v1/identity/bvn',
          method: 'POST',
          methodName: 'create',
          summary: 'Verify BVN',
          operationId: 'postV1IdentityBvn',
          responseType: 'Bvn',
          inputType: 'BvnInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'CableBill',
      propertyName: 'cableBills',
      operations: [
        {
          path: '/v1/bills/cable',
          method: 'POST',
          methodName: 'create',
          summary: 'Buy Cable TV',
          operationId: 'postV1BillsCable',
          responseType: 'Cable',
          inputType: 'CableInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'ChargeIssuing',
      propertyName: 'chargeIssuings',
      operations: [
        {
          path: '/v1/issuing/charges',
          method: 'GET',
          methodName: 'list',
          summary: 'Card Decline Charges',
          operationId: 'getV1IssuingCharges',
          responseType: 'Charge[]',
          inputType: 'CustomerListInput',
          queryType: 'ChargeQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [
            {
              name: 'channel',
              accessor: 'channel',
              in: 'query',
              required: false,
            },
            {
              name: 'end_date',
              accessor: 'endDate',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'search',
              accessor: 'search',
              in: 'query',
              required: false,
            },
            {
              name: 'start_date',
              accessor: 'startDate',
              in: 'query',
              required: false,
            },
            {
              name: 'transaction_id',
              accessor: 'transactionId',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Counterparty',
      propertyName: 'counterparties',
      operations: [
        {
          path: '/v1/collections/virtual-account/counterparties',
          method: 'POST',
          methodName: 'create',
          summary: 'Create a Counterparty',
          operationId: 'postV1CollectionsVirtualAccountCounterparties',
          responseType: 'Counterparty',
          inputType: 'CounterpartyInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/collections/virtual-account/counterparties/{counter_party_id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Counterparty By ID',
          operationId:
            'getV1CollectionsVirtualAccountCounterpartiesCounterPartyId',
          responseType: 'Counterparty[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CounterpartyByCounterPartyIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'counter_party_id',
              accessor: 'counterPartyId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/collections/virtual-account/{id}/counterparties',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Counterparty By Account ID',
          operationId: 'getV1CollectionsVirtualAccountIdCounterparties',
          responseType: 'Counterparty[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Country',
      propertyName: 'countries',
      operations: [
        {
          path: '/v1/countries',
          method: 'GET',
          methodName: 'list',
          summary: 'Get all Countries',
          operationId: 'getV1Countries',
          responseType: 'Country[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Credit',
      propertyName: 'credits',
      operations: [
        {
          path: '/v1/test/wallet/credit',
          method: 'POST',
          methodName: 'create',
          summary: 'Credit Test Wallet',
          operationId: 'postV1TestWalletCredit',
          responseType: 'Tier1',
          inputType: 'CreditInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Crypto',
      propertyName: 'cryptos',
      operations: [
        {
          path: '/v1/crypto',
          method: 'POST',
          methodName: 'create',
          summary: 'Generate Address',
          operationId: 'postV1Crypto',
          responseType: 'Crypto',
          inputType: 'CryptoInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/crypto/{address_id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Address',
          operationId: 'getV1CryptoAddressId',
          responseType: 'Crypto',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CryptoByAddressIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'address_id',
              accessor: 'addressId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/crypto/:id',
          method: 'PATCH',
          methodName: 'update',
          summary: 'Update OffRamp',
          operationId: 'patchV1CryptoId',
          responseType: 'Active',
          inputType: 'CryptoByIdInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'CryptoWallet',
      propertyName: 'cryptoWallets',
      operations: [
        {
          path: '/v1/crypto/wallets/{customer_id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Addresses',
          operationId: 'getV1CryptoWalletsCustomerId',
          responseType: 'Crypto[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'ActiveParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'customer_id',
              accessor: 'customerId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Currency',
      propertyName: 'currencies',
      operations: [
        {
          path: '/v1/currencies',
          method: 'GET',
          methodName: 'list',
          summary: 'Get all Currencies',
          operationId: 'getV1Currencies',
          responseType: 'Currency[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'CustomerAccount',
      propertyName: 'customerAccounts',
      operations: [
        {
          path: '/v1/customers/{id}/accounts',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Customer Accounts',
          operationId: 'getV1CustomersIdAccounts',
          responseType: 'CustomerAccount[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Customer',
      propertyName: 'customers',
      operations: [
        {
          path: '/v1/customers',
          method: 'POST',
          methodName: 'create',
          summary: 'Create a Customer (Tier 0)',
          operationId: 'postV1Customers',
          responseType: 'Customer',
          inputType: 'CustomerInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/customers',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Customers by Query',
          operationId: 'getV1Customers',
          responseType: 'Customer[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [
            {
              name: 'email',
              accessor: 'email',
              in: 'query',
              required: false,
            },
            {
              name: 'end_date',
              accessor: 'endDate',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'search',
              accessor: 'search',
              in: 'query',
              required: false,
            },
            {
              name: 'start_date',
              accessor: 'startDate',
              in: 'query',
              required: false,
            },
            {
              name: 'status',
              accessor: 'status',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
        {
          path: '/v1/customers/{id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get a Customer',
          operationId: 'getV1CustomersId',
          responseType: 'Customer',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'CustomerTransaction',
      propertyName: 'customerTransactions',
      operations: [
        {
          path: '/v1/customers/{id}/transactions',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Customer Transactions',
          operationId: 'getV1CustomersIdTransactions',
          responseType: 'CustomerTransaction[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'DataBill',
      propertyName: 'dataBills',
      operations: [
        {
          path: '/v1/bills/data',
          method: 'POST',
          methodName: 'create',
          summary: 'Buy Data',
          operationId: 'postV1BillsData',
          responseType: 'Data',
          inputType: 'DataInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'DynamicAccountCollection',
      propertyName: 'dynamicAccountCollections',
      operations: [
        {
          path: '/v1/collections/dynamic-account',
          method: 'POST',
          methodName: 'create',
          summary: 'Dynamic (One-Time Use) Account',
          operationId: 'postV1CollectionsDynamicAccount',
          responseType: 'Active',
          inputType: 'DynamicAccountInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'ElectricityBill',
      propertyName: 'electricityBills',
      operations: [
        {
          path: '/v1/bills/electricity',
          method: 'POST',
          methodName: 'create',
          summary: 'Buy Electricity',
          operationId: 'postV1BillsElectricity',
          responseType: 'Electricity',
          inputType: 'ElectricityInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'EnrollCustomer',
      propertyName: 'enrollCustomers',
      operations: [
        {
          path: '/v1/customers/enroll',
          method: 'POST',
          methodName: 'create',
          summary: 'Enroll Customer (Full)',
          operationId: 'postV1CustomersEnroll',
          responseType: 'Customer',
          inputType: 'EnrollInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'FetchInstitution',
      propertyName: 'fetchInstitutions',
      operations: [
        {
          path: '/v1/institutions/fetch',
          method: 'POST',
          methodName: 'create',
          summary: 'Fetch Bank Details',
          operationId: 'postV1InstitutionsFetch',
          responseType: 'Fetch',
          inputType: 'FetchInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'FreezeIssuing',
      propertyName: 'freezeIssuings',
      operations: [
        {
          path: '/v1/issuing/{id}/freeze',
          method: 'PATCH',
          methodName: 'update',
          summary: 'Freeze a Card',
          operationId: 'patchV1IssuingIdFreeze',
          responseType: 'Tier1',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'FundIssuing',
      propertyName: 'fundIssuings',
      operations: [
        {
          path: '/v1/issuing/{id}/fund',
          method: 'POST',
          methodName: 'create',
          summary: 'Fund a Card',
          operationId: 'postV1IssuingIdFund',
          responseType: 'Fund',
          inputType: 'FundInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Fx',
      propertyName: 'fxs',
      operations: [
        {
          path: '/v1/fx',
          method: 'POST',
          methodName: 'create',
          summary: 'Exchange Currency',
          operationId: 'postV1Fx',
          responseType: 'Fx',
          inputType: 'FxInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/fx',
          method: 'GET',
          methodName: 'list',
          summary: 'Get FX History',
          operationId: 'getV1Fx',
          responseType: 'Active',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'HistoryWallet',
      propertyName: 'historyWallets',
      operations: [
        {
          path: '/v1/wallets/history',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Wallets History',
          operationId: 'getV1WalletsHistory',
          responseType: 'WalletHistory[]',
          inputType: 'CustomerListInput',
          queryType: 'IssuingTransactionQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [
            {
              name: 'end_date',
              accessor: 'endDate',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'start_date',
              accessor: 'startDate',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
        {
          path: '/v1/wallets/{currency_code}/history',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Wallets History by Currency',
          operationId: 'getV1WalletsCurrencyCodeHistory',
          responseType: 'WalletHistory[]',
          inputType: 'CustomerListInput',
          queryType: 'WalletHistoryByCurrencyCodeQuery',
          headerType: 'CustomerHeader',
          paramsType: 'WalletHistoryByCurrencyCodeParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'currency_code',
              accessor: 'currencyCode',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [
            {
              name: 'end_date',
              accessor: 'endDate',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'start_date',
              accessor: 'startDate',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Institution',
      propertyName: 'institutions',
      operations: [
        {
          path: '/v1/institutions',
          method: 'GET',
          methodName: 'list',
          summary: 'Get all Institutions',
          operationId: 'getV1Institutions',
          responseType: 'Institution[]',
          inputType: 'CustomerListInput',
          queryType: 'InstitutionQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [
            {
              name: 'country',
              accessor: 'country',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'type',
              accessor: 'type',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Issuing',
      propertyName: 'issuings',
      operations: [
        {
          path: '/v1/issuing',
          method: 'POST',
          methodName: 'create',
          summary: 'Create a Card',
          operationId: 'postV1Issuing',
          responseType: 'Issuing',
          inputType: 'IssuingInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/issuing',
          method: 'GET',
          methodName: 'list',
          summary: 'Get all Cards',
          operationId: 'getV1Issuing',
          responseType: 'Issuing[]',
          inputType: 'CustomerListInput',
          queryType: 'IssuingGetIssuingQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [
            {
              name: 'brand',
              accessor: 'brand',
              in: 'query',
              required: false,
            },
            {
              name: 'created_at',
              accessor: 'createdAt',
              in: 'query',
              required: false,
            },
            {
              name: 'customer_id',
              accessor: 'customerId',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'status',
              accessor: 'status',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
        {
          path: '/v1/issuing/{id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get a Card',
          operationId: 'getV1IssuingId',
          responseType: 'Issuing',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'IssuingTransaction',
      propertyName: 'issuingTransactions',
      operations: [
        {
          path: '/v1/issuing/{id}/transactions',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Card Transactions',
          operationId: 'getV1IssuingIdTransactions',
          responseType: 'IssuingTransaction[]',
          inputType: 'CustomerListInput',
          queryType: 'IssuingTransactionQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [
            {
              name: 'end_date',
              accessor: 'endDate',
              in: 'query',
              required: false,
            },
            {
              name: 'page',
              accessor: 'page',
              in: 'query',
              required: false,
            },
            {
              name: 'page_size',
              accessor: 'pageSize',
              in: 'query',
              required: false,
            },
            {
              name: 'start_date',
              accessor: 'startDate',
              in: 'query',
              required: false,
            },
          ],
          headerParams: [],
        },
      ],
    },
    {
      className: 'KycLink',
      propertyName: 'kycLinks',
      operations: [
        {
          path: '/v1/collections/usd/kyc_link',
          method: 'POST',
          methodName: 'create',
          summary: 'Create Account(USD) KYC Link',
          operationId: 'postV1CollectionsUsdKycLink',
          responseType: 'Active',
          inputType: 'KycLinkInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'MockTransactionIssuing',
      propertyName: 'mockTransactionIssuings',
      operations: [
        {
          path: '/v1/test/issuing/{id}/mock-transaction',
          method: 'POST',
          methodName: 'create',
          summary: 'Mock Card Transaction',
          operationId: 'postV1TestIssuingIdMockTransaction',
          responseType: 'MockTransaction',
          inputType: 'MockTransactionInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'MockTransaction',
      propertyName: 'mockTransactions',
      operations: [
        {
          path: '/v1/test/collection/mock-transaction',
          method: 'POST',
          methodName: 'create',
          summary: 'Mock Collection Transaction',
          operationId: 'postV1TestCollectionMockTransaction',
          responseType: 'Tier1',
          inputType: 'MockTransactionCollectionInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'MomoCollection',
      propertyName: 'momoCollections',
      operations: [
        {
          path: '/v1/collections/momo',
          method: 'POST',
          methodName: 'create',
          summary: 'Mobile Money',
          operationId: 'postV1CollectionsMomo',
          responseType: 'Momo',
          inputType: 'MomoInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'QuoteFx',
      propertyName: 'quoteFxs',
      operations: [
        {
          path: '/v1/fx/quote',
          method: 'POST',
          methodName: 'create',
          summary: 'Generate FX quote',
          operationId: 'postV1FxQuote',
          responseType: 'Quote',
          inputType: 'QuoteInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'ResolveAccount',
      propertyName: 'resolveAccounts',
      operations: [
        {
          path: '/v1/bills/electricity/resolve-account',
          method: 'POST',
          methodName: 'create',
          summary: 'Resolve Electricity Meter Account',
          operationId: 'postV1BillsElectricityResolveAccount',
          responseType: 'ResolveAccount',
          inputType: 'ResolveAccountInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'ResolveInstitution',
      propertyName: 'resolveInstitutions',
      operations: [
        {
          path: '/v1/institutions/resolve',
          method: 'POST',
          methodName: 'create',
          summary: 'Resolve Institution Account',
          operationId: 'postV1InstitutionsResolve',
          responseType: 'Resolve',
          inputType: 'ResolveInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'VirtualAccountStatus',
      propertyName: 'virtualAccountStatus',
      operations: [
        {
          path: '/v1/collections/virtual-account/status/{reference}',
          method: 'GET',
          methodName: 'get',
          summary: 'Check Account Request Status',
          operationId: 'getV1CollectionsVirtualAccountStatusReference',
          responseType: 'VirtualAccountStatus',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'VirtualAccountStatusParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'reference',
              accessor: 'reference',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Subscription',
      propertyName: 'subscriptions',
      operations: [
        {
          path: '/v1/bills/cable/subscriptions/{biller_identifier}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Cable Subscription Plans',
          operationId: 'getV1BillsCableSubscriptionsBillerIdentifier',
          responseType: 'Subscription[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'SubscriptionParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'biller_identifier',
              accessor: 'billerIdentifier',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'TerminateIssuing',
      propertyName: 'terminateIssuings',
      operations: [
        {
          path: '/v1/issuing/{id}/terminate',
          method: 'PUT',
          methodName: 'update',
          summary: 'Terminate Card',
          operationId: 'putV1IssuingIdTerminate',
          responseType: 'Tier1',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Tier1',
      propertyName: 'tier1s',
      operations: [
        {
          path: '/v1/customers/upgrade/tier1',
          method: 'PATCH',
          methodName: 'update',
          summary: 'Upgrade Customer (Tier 1)',
          operationId: 'patchV1CustomersUpgradeTier1',
          responseType: 'Tier1',
          inputType: 'Tier1Input',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Tier2',
      propertyName: 'tier2s',
      operations: [
        {
          path: '/v1/customers/upgrade/tier2',
          method: 'PATCH',
          methodName: 'update',
          summary: 'Upgrade Customer (Tier 2)',
          operationId: 'patchV1CustomersUpgradeTier2',
          responseType: 'Tier2',
          inputType: 'Tier2Input',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Transaction',
      propertyName: 'transactions',
      operations: [
        {
          path: '/v1/transactions',
          method: 'GET',
          methodName: 'list',
          summary: 'Get All Transactions',
          operationId: 'getV1Transactions',
          responseType: 'Transaction[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/transactions/{id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Transaction By ID/Reference',
          operationId: 'getV1TransactionsId',
          responseType: 'Transaction',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'TransferCrypto',
      propertyName: 'transferCryptos',
      operations: [
        {
          path: '/v1/crypto/transfer',
          method: 'POST',
          methodName: 'create',
          summary: 'Transfer',
          operationId: 'postV1CryptoTransfer',
          responseType: 'Transfer',
          inputType: 'TransferInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Transfer',
      propertyName: 'transfers',
      operations: [
        {
          path: '/v1/transfers',
          method: 'POST',
          methodName: 'create',
          summary: 'Local Payments (Africa)',
          operationId: 'postV1Transfers',
          responseType: 'Transfer',
          inputType: 'TransferCreateInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/transfers/{transfer_id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Verify Transfer by ID/Reference',
          operationId: 'getV1TransfersTransferId',
          responseType: 'Transfer',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'TransferByTransferIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'transfer_id',
              accessor: 'transferId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'UnfreezeIssuing',
      propertyName: 'unfreezeIssuings',
      operations: [
        {
          path: '/v1/issuing/{id}/unfreeze',
          method: 'PATCH',
          methodName: 'update',
          summary: 'Unfreeze a Card',
          operationId: 'patchV1IssuingIdUnfreeze',
          responseType: 'Tier1',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'UpdateCustomer',
      propertyName: 'updateCustomers',
      operations: [
        {
          path: '/v1/customers/update',
          method: 'PATCH',
          methodName: 'update',
          summary: 'Update Customer',
          operationId: 'patchV1CustomersUpdate',
          responseType: 'Active',
          inputType: 'UpdateInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Usd',
      propertyName: 'usds',
      operations: [
        {
          path: '/v1/collections/virtual-account/usd',
          method: 'POST',
          methodName: 'create',
          summary: 'Create Account (USD)',
          operationId: 'postV1CollectionsVirtualAccountUsd',
          responseType: 'Usd',
          inputType: 'UsdInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'UsdTransfer',
      propertyName: 'usdTransfers',
      operations: [
        {
          path: '/v2/transfers/usd',
          method: 'POST',
          methodName: 'create',
          summary: 'US Payments (ACH/Wire)',
          operationId: 'postV2TransfersUsd',
          responseType: 'Usd',
          inputType: 'UsdTransferInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'UtilityBill',
      propertyName: 'utilityBills',
      operations: [
        {
          path: '/v1/bills/utility',
          method: 'POST',
          methodName: 'create',
          summary: 'Buy Energy/Utility',
          operationId: 'postV1BillsUtility',
          responseType: 'Utility',
          inputType: 'UtilityInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Verify',
      propertyName: 'verifies',
      operations: [
        {
          path: '/v1/transactions/verify/{id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Verify Transaction',
          operationId: 'getV1TransactionsVerifyId',
          responseType: 'Verify',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'VerifyOtp',
      propertyName: 'verifyOtps',
      operations: [
        {
          path: '/v1/collections/momo/verify-otp',
          method: 'POST',
          methodName: 'create',
          summary: 'Verify OTP',
          operationId: 'postV1CollectionsMomoVerifyOtp',
          responseType: 'VerifyOtp',
          inputType: 'VerifyOtpInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'VirtualAccountCollection',
      propertyName: 'virtualAccountCollections',
      operations: [
        {
          path: '/v1/collections/virtual-account',
          method: 'POST',
          methodName: 'create',
          summary: 'Create Static Account',
          operationId: 'postV1CollectionsVirtualAccount',
          responseType: 'CustomerAccount',
          inputType: 'VirtualAccountInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
        {
          path: '/v1/collections/virtual-account/{id}',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Virtual Account by ID',
          operationId: 'getV1CollectionsVirtualAccountId',
          responseType: 'VirtualAccountById',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'VirtualAccountCustomer',
      propertyName: 'virtualAccountCustomers',
      operations: [
        {
          path: '/v1/customers/{customer_id}/virtual-account',
          method: 'GET',
          methodName: 'get',
          summary: 'Get Customer Virtual Accounts',
          operationId: 'getV1CustomersCustomerIdVirtualAccount',
          responseType: 'CustomerAccount[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'ActiveParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'customer_id',
              accessor: 'customerId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'VirtualAccountRail',
      propertyName: 'virtualAccountRails',
      operations: [
        {
          path: '/v1/collections/virtual-account/{account_id}/rails',
          method: 'GET',
          methodName: 'list',
          summary: 'Supported Rails',
          operationId: 'getV1CollectionsVirtualAccountAccountIdRails',
          responseType: 'Rail[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'RailParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [
            {
              name: 'account_id',
              accessor: 'accountId',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'Wallet',
      propertyName: 'wallets',
      operations: [
        {
          path: '/v1/wallets',
          method: 'GET',
          methodName: 'list',
          summary: 'Get Wallets',
          operationId: 'getV1Wallets',
          responseType: 'WalletList[]',
          inputType: 'CustomerListInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerParams',
          hasBody: false,
          bodyRequired: false,
          pathParams: [],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
    {
      className: 'WithdrawIssuing',
      propertyName: 'withdrawIssuings',
      operations: [
        {
          path: '/v1/issuing/{id}/withdraw',
          method: 'POST',
          methodName: 'create',
          summary: 'Withdraw from a Card',
          operationId: 'postV1IssuingIdWithdraw',
          responseType: 'Fund',
          inputType: 'FundInput',
          queryType: 'CustomerQuery',
          headerType: 'CustomerHeader',
          paramsType: 'CustomerByIdParams',
          hasBody: true,
          bodyRequired: true,
          pathParams: [
            {
              name: 'id',
              accessor: 'id',
              in: 'path',
              required: true,
            },
          ],
          queryParams: [],
          headerParams: [],
        },
      ],
    },
  ],
} as const satisfies OpenApiSdkManifest

export const extractedApiDocument: ExtractedApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Extracted API',
    version: '0.0.0',
  },
  paths: {
    '/v1/customers': {
      post: {
        summary: 'Create a Customer (Tier 0)',
        description:
          'This resource enables the creation of a new customer. A customer ID is returned which can be used for further actions within the Maplerad ecosystem.',
        operationId: 'postV1Customers',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  first_name: {
                    type: 'string',
                    default: 'John',
                  },
                  last_name: {
                    type: 'string',
                    default: 'Doe',
                  },
                  email: {
                    type: 'string',
                    default: 'johndoe@example.com',
                  },
                  country: {
                    type: 'string',
                    description: 'The country of origin of the customer.',
                    default: 'NG',
                  },
                },
                example: {
                  first_name: 'John',
                  last_name: 'Doe',
                  email: 'johndoe@example.com',
                  country: 'NG',
                },
                required: ['first_name', 'last_name', 'email', 'country'],
              },
              example: {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@example.com',
                country: 'NG',
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Customer created successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '42649071-ec92-45f0-af54-83a611ed5653',
                        },
                        first_name: {
                          type: 'string',
                          example: 'John',
                        },
                        last_name: {
                          type: 'string',
                          example: 'Doe',
                        },
                        email: {
                          type: 'string',
                          example: 'johndoe@example.com',
                        },
                        country: {
                          type: 'string',
                          example: 'NG',
                        },
                        status: {
                          type: 'string',
                          example: 'PENDING',
                        },
                        tier: {
                          type: 'integer',
                          example: 0,
                        },
                        created_at: {
                          type: 'string',
                          example: '2022-08-13T17:36:29.456562-05:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2022-08-13T17:36:29.456562-05:00',
                        },
                      },
                      example: {
                        id: '42649071-ec92-45f0-af54-83a611ed5653',
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'johndoe@example.com',
                        country: 'NG',
                        status: 'PENDING',
                        tier: 0,
                        created_at: '2022-08-13T17:36:29.456562-05:00',
                        updated_at: '2022-08-13T17:36:29.456562-05:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Customer created successfully',
                    data: {
                      id: '42649071-ec92-45f0-af54-83a611ed5653',
                      first_name: 'John',
                      last_name: 'Doe',
                      email: 'johndoe@example.com',
                      country: 'NG',
                      status: 'PENDING',
                      tier: 0,
                      created_at: '2022-08-13T17:36:29.456562-05:00',
                      updated_at: '2022-08-13T17:36:29.456562-05:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Customer created successfully',
                  data: {
                    id: '42649071-ec92-45f0-af54-83a611ed5653',
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'johndoe@example.com',
                    country: 'NG',
                    status: 'PENDING',
                    tier: 0,
                    created_at: '2022-08-13T17:36:29.456562-05:00',
                    updated_at: '2022-08-13T17:36:29.456562-05:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
      get: {
        summary: 'Get Customers by Query',
        description: 'This resource retrieves all customers created',
        operationId: 'getV1Customers',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '1',
            },
            example: '1',
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '10',
            },
            example: '10',
          },
          {
            name: 'start_date',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '2023-05-09',
            },
            example: '2023-05-09',
          },
          {
            name: 'end_date',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '2023-04-09',
            },
            example: '2023-04-09',
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            description: 'Status of the customer registration',
            schema: {
              type: 'string',
              description: 'Status of the customer registration',
              default: 'COMPLETED',
            },
            example: 'COMPLETED',
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            description: 'A way to find a particular customer',
            schema: {
              type: 'string',
              description: 'A way to find a particular customer',
            },
          },
          {
            name: 'email',
            in: 'query',
            required: false,
            description: 'Filters customers by email address.',
            schema: {
              type: 'string',
              description: 'Filters customers by email address.',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully fetched customers',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '78d22d4c-616e-4a3b-9122-8e53f86a417e',
                          },
                          first_name: {
                            type: 'string',
                            example: 'John',
                          },
                          last_name: {
                            type: 'string',
                            example: 'Doe',
                          },
                          middle_name: {},
                          email: {
                            type: 'string',
                            example: 'a@a.com',
                          },
                          phone_number: {
                            type: 'string',
                            example: '+2348109919919',
                          },
                          status: {
                            type: 'string',
                            example: 'COMPLETED',
                          },
                          can_enrol_visa_card: {
                            type: 'boolean',
                            example: true,
                          },
                          dob: {
                            type: 'string',
                            example: '07-01-1958',
                          },
                          type: {
                            type: 'string',
                            example: 'INDIVIDUAL',
                          },
                          active: {
                            type: 'boolean',
                            example: true,
                          },
                          disabled: {
                            type: 'boolean',
                            example: false,
                          },
                          identity: {
                            type: 'object',
                            properties: {
                              type: {
                                type: 'string',
                                example: 'BVN',
                              },
                              number: {
                                type: 'string',
                                example: '20020020020',
                              },
                              image: {},
                              country: {
                                type: 'string',
                                example: 'NG',
                              },
                            },
                            example: {
                              type: 'BVN',
                              number: '20020020020',
                              image: null,
                              country: 'NG',
                            },
                          },
                          address: {
                            type: 'object',
                            properties: {
                              street: {
                                type: 'string',
                                example: '63 banana island',
                              },
                              street2: {
                                type: 'string',
                                example: '',
                              },
                              city: {
                                type: 'string',
                                example: 'Isolo',
                              },
                              state: {
                                type: 'string',
                                example: 'Lagos',
                              },
                              postal_code: {
                                type: 'string',
                                example: '770835',
                              },
                              country: {
                                type: 'string',
                                example: 'NG',
                              },
                            },
                            example: {
                              street: '63 banana island',
                              street2: '',
                              city: 'Isolo',
                              state: 'Lagos',
                              postal_code: '770835',
                              country: 'NG',
                            },
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-05-23T16:45:44.154499-05:00',
                          },
                          updated_at: {
                            type: 'string',
                            example: '2022-05-23T16:45:44.154499-05:00',
                          },
                        },
                        example: {
                          id: '78d22d4c-616e-4a3b-9122-8e53f86a417e',
                          first_name: 'John',
                          last_name: 'Doe',
                          middle_name: null,
                          email: 'a@a.com',
                          phone_number: '+2348109919919',
                          status: 'COMPLETED',
                          can_enrol_visa_card: true,
                          dob: '07-01-1958',
                          type: 'INDIVIDUAL',
                          active: true,
                          disabled: false,
                          identity: {
                            type: 'BVN',
                            number: '20020020020',
                            image: null,
                            country: 'NG',
                          },
                          address: {
                            street: '63 banana island',
                            street2: '',
                            city: 'Isolo',
                            state: 'Lagos',
                            postal_code: '770835',
                            country: 'NG',
                          },
                          created_at: '2022-05-23T16:45:44.154499-05:00',
                          updated_at: '2022-05-23T16:45:44.154499-05:00',
                        },
                      },
                      example: [
                        {
                          id: '78d22d4c-616e-4a3b-9122-8e53f86a417e',
                          first_name: 'John',
                          last_name: 'Doe',
                          middle_name: null,
                          email: 'a@a.com',
                          phone_number: '+2348109919919',
                          status: 'COMPLETED',
                          can_enrol_visa_card: true,
                          dob: '07-01-1958',
                          type: 'INDIVIDUAL',
                          active: true,
                          disabled: false,
                          identity: {
                            type: 'BVN',
                            number: '20020020020',
                            image: null,
                            country: 'NG',
                          },
                          address: {
                            street: '63 banana island',
                            street2: '',
                            city: 'Isolo',
                            state: 'Lagos',
                            postal_code: '770835',
                            country: 'NG',
                          },
                          created_at: '2022-05-23T16:45:44.154499-05:00',
                          updated_at: '2022-05-23T16:45:44.154499-05:00',
                        },
                        {
                          id: 'bc14f34e-2598-47e3-8acc-153601aef729',
                          first_name: 'Jane',
                          last_name: 'Doe',
                          middle_name: null,
                          email: 'z@xyz.com',
                          phone_number: '+2349109919919',
                          status: 'COMPLETED',
                          can_enrol_visa_card: true,
                          dob: '07-01-1959',
                          type: 'INDIVIDUAL',
                          active: true,
                          disabled: false,
                          identity: {
                            type: 'BVN',
                            number: '0123456789',
                            image: null,
                            country: 'NG',
                          },
                          address: {
                            street: '63 banana island',
                            city: 'Isolo',
                            state: 'Lagos',
                            postal_code: '770835',
                            country: 'NG',
                          },
                          created_at: '2022-05-23T16:51:50.348312-05:00',
                          updated_at: '2022-05-23T16:51:50.348312-05:00',
                        },
                      ],
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: {
                          type: 'integer',
                          example: 1,
                        },
                        page_size: {
                          type: 'integer',
                          example: 5,
                        },
                        total: {
                          type: 'integer',
                          example: 6,
                        },
                      },
                      example: {
                        page: 1,
                        page_size: 5,
                        total: 6,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully fetched customers',
                    data: [
                      {
                        id: '78d22d4c-616e-4a3b-9122-8e53f86a417e',
                        first_name: 'John',
                        last_name: 'Doe',
                        middle_name: null,
                        email: 'a@a.com',
                        phone_number: '+2348109919919',
                        status: 'COMPLETED',
                        can_enrol_visa_card: true,
                        dob: '07-01-1958',
                        type: 'INDIVIDUAL',
                        active: true,
                        disabled: false,
                        identity: {
                          type: 'BVN',
                          number: '20020020020',
                          image: null,
                          country: 'NG',
                        },
                        address: {
                          street: '63 banana island',
                          street2: '',
                          city: 'Isolo',
                          state: 'Lagos',
                          postal_code: '770835',
                          country: 'NG',
                        },
                        created_at: '2022-05-23T16:45:44.154499-05:00',
                        updated_at: '2022-05-23T16:45:44.154499-05:00',
                      },
                      {
                        id: 'bc14f34e-2598-47e3-8acc-153601aef729',
                        first_name: 'Jane',
                        last_name: 'Doe',
                        middle_name: null,
                        email: 'z@xyz.com',
                        phone_number: '+2349109919919',
                        status: 'COMPLETED',
                        can_enrol_visa_card: true,
                        dob: '07-01-1959',
                        type: 'INDIVIDUAL',
                        active: true,
                        disabled: false,
                        identity: {
                          type: 'BVN',
                          number: '0123456789',
                          image: null,
                          country: 'NG',
                        },
                        address: {
                          street: '63 banana island',
                          city: 'Isolo',
                          state: 'Lagos',
                          postal_code: '770835',
                          country: 'NG',
                        },
                        created_at: '2022-05-23T16:51:50.348312-05:00',
                        updated_at: '2022-05-23T16:51:50.348312-05:00',
                      },
                    ],
                    meta: {
                      page: 1,
                      page_size: 5,
                      total: 6,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully fetched customers',
                  data: [
                    {
                      id: '78d22d4c-616e-4a3b-9122-8e53f86a417e',
                      first_name: 'John',
                      last_name: 'Doe',
                      middle_name: null,
                      email: 'a@a.com',
                      phone_number: '+2348109919919',
                      status: 'COMPLETED',
                      can_enrol_visa_card: true,
                      dob: '07-01-1958',
                      type: 'INDIVIDUAL',
                      active: true,
                      disabled: false,
                      identity: {
                        type: 'BVN',
                        number: '20020020020',
                        image: null,
                        country: 'NG',
                      },
                      address: {
                        street: '63 banana island',
                        street2: '',
                        city: 'Isolo',
                        state: 'Lagos',
                        postal_code: '770835',
                        country: 'NG',
                      },
                      created_at: '2022-05-23T16:45:44.154499-05:00',
                      updated_at: '2022-05-23T16:45:44.154499-05:00',
                    },
                    {
                      id: 'bc14f34e-2598-47e3-8acc-153601aef729',
                      first_name: 'Jane',
                      last_name: 'Doe',
                      middle_name: null,
                      email: 'z@xyz.com',
                      phone_number: '+2349109919919',
                      status: 'COMPLETED',
                      can_enrol_visa_card: true,
                      dob: '07-01-1959',
                      type: 'INDIVIDUAL',
                      active: true,
                      disabled: false,
                      identity: {
                        type: 'BVN',
                        number: '0123456789',
                        image: null,
                        country: 'NG',
                      },
                      address: {
                        street: '63 banana island',
                        city: 'Isolo',
                        state: 'Lagos',
                        postal_code: '770835',
                        country: 'NG',
                      },
                      created_at: '2022-05-23T16:51:50.348312-05:00',
                      updated_at: '2022-05-23T16:51:50.348312-05:00',
                    },
                  ],
                  meta: {
                    page: 1,
                    page_size: 5,
                    total: 6,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/upgrade/tier1': {
      patch: {
        summary: 'Upgrade Customer (Tier 1)',
        description:
          'This resource allows for a customer to be upgraded to tier one in order to process services like Collections.',
        operationId: 'patchV1CustomersUpgradeTier1',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description: 'Maplerad issued ID for the customer.',
                  },
                  dob: {
                    type: 'string',
                    description:
                      "The customer's date of birth in the format DD-MM-YYYY",
                    default: '24-05-1983',
                  },
                  phone: {
                    type: 'object',
                    required: ['phone_country_code', 'phone_number'],
                    properties: {
                      phone_country_code: {
                        type: 'string',
                        default: '+234',
                      },
                      phone_number: {
                        type: 'string',
                        default: '8123456789',
                      },
                    },
                  },
                  address: {
                    type: 'object',
                    required: [
                      'street',
                      'city',
                      'state',
                      'country',
                      'postal_code',
                    ],
                    properties: {
                      street: {
                        type: 'string',
                        default: '63 banana island',
                      },
                      street2: {
                        type: 'string',
                        default: 'null',
                      },
                      city: {
                        type: 'string',
                        default: 'Isolo',
                      },
                      state: {
                        type: 'string',
                        default: 'Lagos',
                      },
                      country: {
                        type: 'string',
                        default: 'NG',
                      },
                      postal_code: {
                        type: 'string',
                        default: '770835',
                      },
                    },
                  },
                  identification_number: {
                    type: 'string',
                    description:
                      'An identification number issued by a governing body. BVN for Nigeria et.c',
                  },
                  photo: {
                    type: 'string',
                    description: 'A photo url for this customer',
                  },
                },
                required: [
                  'customer_id',
                  'dob',
                  'phone',
                  'address',
                  'identification_number',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Customer upgraded successfully',
                    },
                  },
                  example: {
                    status: true,
                    message: 'Customer upgraded successfully',
                  },
                },
                example: {
                  status: true,
                  message: 'Customer upgraded successfully',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/upgrade/tier2': {
      patch: {
        summary: 'Upgrade Customer (Tier 2)',
        description:
          'This resource allows a customer to be upgraded to tier two.',
        operationId: 'patchV1CustomersUpgradeTier2',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description: 'The Maplerad issued ID of the customer.',
                  },
                  identity: {
                    type: 'object',
                    required: ['type', 'image', 'number', 'country'],
                    properties: {
                      type: {
                        type: 'string',
                        description:
                          'The identity type to verify the customer.',
                        default: 'NIN',
                      },
                      image: {
                        type: 'string',
                        description: 'The URL to the uploaded document',
                        default: 'null',
                      },
                      number: {
                        type: 'string',
                        description: "The document's number",
                        default: '0123456789',
                      },
                      country: {
                        type: 'string',
                        description:
                          'The country short-code for the identity. NG for Nigeria, GH for Ghana, US for United States. etc.',
                        default: 'NG',
                      },
                    },
                  },
                  photo: {
                    type: 'string',
                    description: 'A url to selfie image of the user',
                    default: 'https://res.cloudinary.com/oinwiovninvw',
                  },
                },
                required: ['customer_id', 'identity'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Customer created successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'd737a562-3ec6-4a6c-8fc1-377d15e059c2',
                        },
                        status: {
                          type: 'string',
                          example: 'COMPLETED',
                        },
                      },
                      example: {
                        id: 'd737a562-3ec6-4a6c-8fc1-377d15e059c2',
                        status: 'COMPLETED',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Customer created successfully',
                    data: {
                      id: 'd737a562-3ec6-4a6c-8fc1-377d15e059c2',
                      status: 'COMPLETED',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Customer created successfully',
                  data: {
                    id: 'd737a562-3ec6-4a6c-8fc1-377d15e059c2',
                    status: 'COMPLETED',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/enroll': {
      post: {
        summary: 'Enroll Customer (Full)',
        description:
          'This endpoint is a direct way to create a customer on Maplerad. The customer will have access to all Maplerad resources including Issuing.',
        operationId: 'postV1CustomersEnroll',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  first_name: {
                    type: 'string',
                    default: 'John',
                  },
                  last_name: {
                    type: 'string',
                    default: 'Doe',
                  },
                  email: {
                    type: 'string',
                    default: 'test@abc.com',
                  },
                  country: {
                    type: 'string',
                    default: 'NG',
                  },
                  identification_number: {
                    type: 'string',
                    description:
                      'An identification number issued by a governing body. e.g BVN for Nigeria et.c',
                  },
                  dob: {
                    type: 'string',
                    default: '20-10-1988',
                  },
                  phone: {
                    type: 'object',
                    required: ['phone_country_code', 'phone_number'],
                    properties: {
                      phone_country_code: {
                        type: 'string',
                        default: '+234',
                      },
                      phone_number: {
                        type: 'string',
                        default: '8123456789',
                      },
                    },
                  },
                  identity: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        description:
                          'The identity type to verify the customer.',
                        default: 'NIN',
                      },
                      image: {
                        type: 'string',
                        description: 'The URL to the uploaded document',
                        default: 'null',
                      },
                      number: {
                        type: 'string',
                        description: "The document's number",
                        default: '0123456789',
                      },
                      country: {
                        type: 'string',
                        description:
                          'The country short-code for the identity. NG for Nigeria, GH for Ghana, US for United States. etc.',
                        default: 'NG',
                      },
                    },
                  },
                  address: {
                    type: 'object',
                    required: [
                      'street',
                      'city',
                      'state',
                      'country',
                      'postal_code',
                    ],
                    properties: {
                      street: {
                        type: 'string',
                        default: '63 banana island',
                      },
                      street2: {
                        type: 'string',
                        default: 'null',
                      },
                      city: {
                        type: 'string',
                        default: 'Isolo',
                      },
                      state: {
                        type: 'string',
                        default: 'Lagos',
                      },
                      country: {
                        type: 'string',
                        default: 'NG',
                      },
                      postal_code: {
                        type: 'string',
                        default: '770835',
                      },
                    },
                  },
                  photo: {
                    type: 'string',
                    description: 'A url to selfie image of the user',
                    default: 'https://res.cloudinary.com/oinwiovninvw',
                  },
                },
                required: [
                  'first_name',
                  'last_name',
                  'email',
                  'country',
                  'identification_number',
                  'dob',
                  'phone',
                  'address',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Customer created successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '0235fa8c-23ce-425e-9636-74e4e358f19c',
                        },
                        first_name: {
                          type: 'string',
                          example: 'John',
                        },
                        last_name: {
                          type: 'string',
                          example: 'Doe',
                        },
                        email: {
                          type: 'string',
                          example: 'test@abc.com',
                        },
                        country: {
                          type: 'string',
                          example: 'NG',
                        },
                        status: {
                          type: 'string',
                          example: 'COMPLETED',
                        },
                        tier: {
                          type: 'integer',
                          example: 2,
                        },
                        created_at: {
                          type: 'string',
                          example: '2022-08-24T13:15:56.821447+01:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2022-08-24T13:15:56.821447+01:00',
                        },
                      },
                      example: {
                        id: '0235fa8c-23ce-425e-9636-74e4e358f19c',
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'test@abc.com',
                        country: 'NG',
                        status: 'COMPLETED',
                        tier: 2,
                        created_at: '2022-08-24T13:15:56.821447+01:00',
                        updated_at: '2022-08-24T13:15:56.821447+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Customer created successfully',
                    data: {
                      id: '0235fa8c-23ce-425e-9636-74e4e358f19c',
                      first_name: 'John',
                      last_name: 'Doe',
                      email: 'test@abc.com',
                      country: 'NG',
                      status: 'COMPLETED',
                      tier: 2,
                      created_at: '2022-08-24T13:15:56.821447+01:00',
                      updated_at: '2022-08-24T13:15:56.821447+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Customer created successfully',
                  data: {
                    id: '0235fa8c-23ce-425e-9636-74e4e358f19c',
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'test@abc.com',
                    country: 'NG',
                    status: 'COMPLETED',
                    tier: 2,
                    created_at: '2022-08-24T13:15:56.821447+01:00',
                    updated_at: '2022-08-24T13:15:56.821447+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/{customer_id}/active': {
      post: {
        summary: 'Whitelist/Blacklist a Customer',
        description:
          'This resource allows a customer to be blacklisted or whitelisted.',
        operationId: 'postV1CustomersCustomerIdActive',
        parameters: [
          {
            name: 'customer_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'f01e7879-fcbd-4588-92fc-d6ca09635e06',
            },
            example: 'f01e7879-fcbd-4588-92fc-d6ca09635e06',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  blacklist: {
                    type: 'boolean',
                    description:
                      'True means the customer will be blacklisted while False',
                    default: 'true',
                  },
                },
                required: ['blacklist'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/{id}': {
      get: {
        summary: 'Get a Customer',
        description: 'This resource retrieves a particular customer details',
        operationId: 'getV1CustomersId',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The customer ID',
            schema: {
              type: 'string',
              description: 'The customer ID',
              default: 'bc14f34e-2598-47e3-8acc-153601aef729',
            },
            example: 'bc14f34e-2598-47e3-8acc-153601aef729',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully fetched customer',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'bc14f34e-2598-47e3-8acc-153601aef729',
                        },
                        first_name: {
                          type: 'string',
                          example: 'John',
                        },
                        last_name: {
                          type: 'string',
                          example: 'Doe',
                        },
                        middle_name: {},
                        email: {
                          type: 'string',
                          example: 'a@abc.com',
                        },
                        phone_number: {
                          type: 'string',
                          example: '+2349087654321',
                        },
                        dob: {
                          type: 'string',
                          example: '07-01-1958',
                        },
                        type: {
                          type: 'string',
                          example: 'INDIVIDUAL',
                        },
                        active: {
                          type: 'boolean',
                          example: true,
                        },
                        disabled: {
                          type: 'boolean',
                          example: false,
                        },
                        identity: {
                          type: 'object',
                          properties: {
                            type: {
                              type: 'string',
                              example: 'BVN',
                            },
                            number: {
                              type: 'string',
                              example: '0123456789',
                            },
                            image: {},
                            country: {
                              type: 'string',
                              example: 'NG',
                            },
                          },
                          example: {
                            type: 'BVN',
                            number: '0123456789',
                            image: null,
                            country: 'NG',
                          },
                        },
                        address: {
                          type: 'object',
                          properties: {
                            street: {
                              type: 'string',
                              example: '63 banana island',
                            },
                            street2: {},
                            city: {
                              type: 'string',
                              example: 'Isolo',
                            },
                            state: {
                              type: 'string',
                              example: 'Lagos',
                            },
                            postal_code: {
                              type: 'string',
                              example: '770835',
                            },
                            country: {
                              type: 'string',
                              example: 'NG',
                            },
                          },
                          example: {
                            street: '63 banana island',
                            street2: null,
                            city: 'Isolo',
                            state: 'Lagos',
                            postal_code: '770835',
                            country: 'NG',
                          },
                        },
                        status: {
                          type: 'string',
                          example: 'COMPLETED',
                        },
                        can_enrol_visa_card: {
                          type: 'boolean',
                          example: true,
                        },
                      },
                      example: {
                        id: 'bc14f34e-2598-47e3-8acc-153601aef729',
                        first_name: 'John',
                        last_name: 'Doe',
                        middle_name: null,
                        email: 'a@abc.com',
                        phone_number: '+2349087654321',
                        dob: '07-01-1958',
                        type: 'INDIVIDUAL',
                        active: true,
                        disabled: false,
                        identity: {
                          type: 'BVN',
                          number: '0123456789',
                          image: null,
                          country: 'NG',
                        },
                        address: {
                          street: '63 banana island',
                          street2: null,
                          city: 'Isolo',
                          state: 'Lagos',
                          postal_code: '770835',
                          country: 'NG',
                        },
                        status: 'COMPLETED',
                        can_enrol_visa_card: true,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully fetched customer',
                    data: {
                      id: 'bc14f34e-2598-47e3-8acc-153601aef729',
                      first_name: 'John',
                      last_name: 'Doe',
                      middle_name: null,
                      email: 'a@abc.com',
                      phone_number: '+2349087654321',
                      dob: '07-01-1958',
                      type: 'INDIVIDUAL',
                      active: true,
                      disabled: false,
                      identity: {
                        type: 'BVN',
                        number: '0123456789',
                        image: null,
                        country: 'NG',
                      },
                      address: {
                        street: '63 banana island',
                        street2: null,
                        city: 'Isolo',
                        state: 'Lagos',
                        postal_code: '770835',
                        country: 'NG',
                      },
                      status: 'COMPLETED',
                      can_enrol_visa_card: true,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully fetched customer',
                  data: {
                    id: 'bc14f34e-2598-47e3-8acc-153601aef729',
                    first_name: 'John',
                    last_name: 'Doe',
                    middle_name: null,
                    email: 'a@abc.com',
                    phone_number: '+2349087654321',
                    dob: '07-01-1958',
                    type: 'INDIVIDUAL',
                    active: true,
                    disabled: false,
                    identity: {
                      type: 'BVN',
                      number: '0123456789',
                      image: null,
                      country: 'NG',
                    },
                    address: {
                      street: '63 banana island',
                      street2: null,
                      city: 'Isolo',
                      state: 'Lagos',
                      postal_code: '770835',
                      country: 'NG',
                    },
                    status: 'COMPLETED',
                    can_enrol_visa_card: true,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/{id}/accounts': {
      get: {
        summary: 'Get Customer Accounts',
        description:
          'This resource returns the accounts created by a customer.',
        operationId: 'getV1CustomersIdAccounts',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The customer ID',
            schema: {
              type: 'string',
              description: 'The customer ID',
              default: '8d22d4c-616e-4a3b-9122-8e53f86a417e',
            },
            example: '8d22d4c-616e-4a3b-9122-8e53f86a417e',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully fetched details',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                          },
                          bank_name: {
                            type: 'string',
                            example: 'VFD MFB',
                          },
                          account_number: {
                            type: 'string',
                            example: '5516529907',
                          },
                          account_name: {
                            type: 'string',
                            example: 'John Doe',
                          },
                          currency: {
                            type: 'string',
                            example: 'NGN',
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-05-24T09:25:51.738654-05:00',
                          },
                        },
                        example: {
                          id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                          bank_name: 'VFD MFB',
                          account_number: '5516529907',
                          account_name: 'John Doe',
                          currency: 'NGN',
                          created_at: '2022-05-24T09:25:51.738654-05:00',
                        },
                      },
                      example: [
                        {
                          id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                          bank_name: 'VFD MFB',
                          account_number: '5516529907',
                          account_name: 'John Doe',
                          currency: 'NGN',
                          created_at: '2022-05-24T09:25:51.738654-05:00',
                        },
                        {
                          id: '89aed690-7a5f-4fe7-aa74-fdb793f72a49',
                          bank_name: 'VFD MFB',
                          account_number: '5107448201',
                          account_name: 'John Doe',
                          currency: 'NGN',
                          created_at: '2022-05-24T09:34:09.98264-05:00',
                        },
                        {
                          id: 'f8bdefd2-c000-41e8-9967-53beb7413cf4',
                          bank_name: 'Maplerad',
                          account_number: '3466198242',
                          account_name: 'John Doe',
                          currency: 'USD',
                          created_at: '2025-03-13T20:53:41.68088+01:00',
                          require_consent: false,
                          consented: false,
                          consent_url: null,
                          reference: null,
                          iban: [
                            {
                              instruction_type: 'ACH',
                              routing_number: '66988434',
                              bank_name: 'Maplerad',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '6243791873',
                              account_name: 'John Doe',
                              memo: 'MPR2021',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                            {
                              instruction_type: 'FEDWIRE',
                              routing_number: '48916510',
                              bank_name: 'Maplerad',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '3219202781',
                              account_name: 'John Doe',
                              memo: 'MPR2021',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                          eur: [],
                        },
                        {
                          id: 'b7b233ab-c4a4-46de-b234-3d29db0ef80d',
                          bank_name: 'Maplerad',
                          account_number: '8369676840',
                          account_name: 'John Doe',
                          currency: 'EUR',
                          created_at: '2025-03-13T20:55:08.189254+01:00',
                          require_consent: false,
                          consented: false,
                          consent_url: null,
                          reference: null,
                          iban: [],
                          eur: [
                            {
                              instruction_type: 'SEPA',
                              bank_name: 'Maplerad',
                              account_number: 'IE07MODR88435395442120',
                              account_name: 'John Doe',
                              bic: 'MODRIE22XOO',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                        },
                        {
                          id: '7551c226-fe9b-4a3f-a0ac-c9fac2f90c41',
                          bank_name: 'Maplerad',
                          account_number: '6634655362',
                          account_name: 'John Doe',
                          currency: 'EUR',
                          created_at: '2025-03-14T04:16:43.616725+01:00',
                          require_consent: false,
                          consented: false,
                          consent_url: null,
                          reference: null,
                          iban: [],
                          eur: [
                            {
                              instruction_type: 'SEPA',
                              bank_name: 'Maplerad',
                              account_number: 'IE07MODR45087720423762',
                              account_name: 'John Doe',
                              bic: 'MODRIE22XOO',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully fetched details',
                    data: [
                      {
                        id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                        bank_name: 'VFD MFB',
                        account_number: '5516529907',
                        account_name: 'John Doe',
                        currency: 'NGN',
                        created_at: '2022-05-24T09:25:51.738654-05:00',
                      },
                      {
                        id: '89aed690-7a5f-4fe7-aa74-fdb793f72a49',
                        bank_name: 'VFD MFB',
                        account_number: '5107448201',
                        account_name: 'John Doe',
                        currency: 'NGN',
                        created_at: '2022-05-24T09:34:09.98264-05:00',
                      },
                      {
                        id: 'f8bdefd2-c000-41e8-9967-53beb7413cf4',
                        bank_name: 'Maplerad',
                        account_number: '3466198242',
                        account_name: 'John Doe',
                        currency: 'USD',
                        created_at: '2025-03-13T20:53:41.68088+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [
                          {
                            instruction_type: 'ACH',
                            routing_number: '66988434',
                            bank_name: 'Maplerad',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '6243791873',
                            account_name: 'John Doe',
                            memo: 'MPR2021',
                            swift_code: '',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                          {
                            instruction_type: 'FEDWIRE',
                            routing_number: '48916510',
                            bank_name: 'Maplerad',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '3219202781',
                            account_name: 'John Doe',
                            memo: 'MPR2021',
                            swift_code: '',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                        eur: [],
                      },
                      {
                        id: 'b7b233ab-c4a4-46de-b234-3d29db0ef80d',
                        bank_name: 'Maplerad',
                        account_number: '8369676840',
                        account_name: 'John Doe',
                        currency: 'EUR',
                        created_at: '2025-03-13T20:55:08.189254+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [],
                        eur: [
                          {
                            instruction_type: 'SEPA',
                            bank_name: 'Maplerad',
                            account_number: 'IE07MODR88435395442120',
                            account_name: 'John Doe',
                            bic: 'MODRIE22XOO',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                      },
                      {
                        id: '7551c226-fe9b-4a3f-a0ac-c9fac2f90c41',
                        bank_name: 'Maplerad',
                        account_number: '6634655362',
                        account_name: 'John Doe',
                        currency: 'EUR',
                        created_at: '2025-03-14T04:16:43.616725+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [],
                        eur: [
                          {
                            instruction_type: 'SEPA',
                            bank_name: 'Maplerad',
                            account_number: 'IE07MODR45087720423762',
                            account_name: 'John Doe',
                            bic: 'MODRIE22XOO',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully fetched details',
                  data: [
                    {
                      id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                      bank_name: 'VFD MFB',
                      account_number: '5516529907',
                      account_name: 'John Doe',
                      currency: 'NGN',
                      created_at: '2022-05-24T09:25:51.738654-05:00',
                    },
                    {
                      id: '89aed690-7a5f-4fe7-aa74-fdb793f72a49',
                      bank_name: 'VFD MFB',
                      account_number: '5107448201',
                      account_name: 'John Doe',
                      currency: 'NGN',
                      created_at: '2022-05-24T09:34:09.98264-05:00',
                    },
                    {
                      id: 'f8bdefd2-c000-41e8-9967-53beb7413cf4',
                      bank_name: 'Maplerad',
                      account_number: '3466198242',
                      account_name: 'John Doe',
                      currency: 'USD',
                      created_at: '2025-03-13T20:53:41.68088+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [
                        {
                          instruction_type: 'ACH',
                          routing_number: '66988434',
                          bank_name: 'Maplerad',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '6243791873',
                          account_name: 'John Doe',
                          memo: 'MPR2021',
                          swift_code: '',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                        {
                          instruction_type: 'FEDWIRE',
                          routing_number: '48916510',
                          bank_name: 'Maplerad',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '3219202781',
                          account_name: 'John Doe',
                          memo: 'MPR2021',
                          swift_code: '',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                      eur: [],
                    },
                    {
                      id: 'b7b233ab-c4a4-46de-b234-3d29db0ef80d',
                      bank_name: 'Maplerad',
                      account_number: '8369676840',
                      account_name: 'John Doe',
                      currency: 'EUR',
                      created_at: '2025-03-13T20:55:08.189254+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [],
                      eur: [
                        {
                          instruction_type: 'SEPA',
                          bank_name: 'Maplerad',
                          account_number: 'IE07MODR88435395442120',
                          account_name: 'John Doe',
                          bic: 'MODRIE22XOO',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                    },
                    {
                      id: '7551c226-fe9b-4a3f-a0ac-c9fac2f90c41',
                      bank_name: 'Maplerad',
                      account_number: '6634655362',
                      account_name: 'John Doe',
                      currency: 'EUR',
                      created_at: '2025-03-14T04:16:43.616725+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [],
                      eur: [
                        {
                          instruction_type: 'SEPA',
                          bank_name: 'Maplerad',
                          account_number: 'IE07MODR45087720423762',
                          account_name: 'John Doe',
                          bic: 'MODRIE22XOO',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/{id}/transactions': {
      get: {
        summary: 'Get Customer Transactions',
        description:
          'This resource returns a list of all transactions a customer has made.',
        operationId: 'getV1CustomersIdTransactions',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The customer ID',
            schema: {
              type: 'string',
              description: 'The customer ID',
              default: 'f01e7879-fcbd-4588-92fc-d6ca09635e06',
            },
            example: 'f01e7879-fcbd-4588-92fc-d6ca09635e06',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Customer transactions fetched successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                          },
                          status: {
                            type: 'string',
                            example: 'SUCCESS',
                          },
                          entry: {
                            type: 'string',
                            example: 'CREDIT',
                          },
                          channel: {
                            type: 'string',
                            example: 'ACCOUNT',
                          },
                          type: {
                            type: 'string',
                            example: 'FUNDING',
                          },
                          amount: {
                            type: 'string',
                            example: '10000',
                          },
                          fee: {
                            type: 'string',
                            example: '5',
                          },
                          currency: {
                            type: 'string',
                            example: 'NGN',
                          },
                          summary: {
                            type: 'string',
                            example: 'Test funding',
                          },
                          reason: {
                            type: 'string',
                            example: 'null',
                          },
                          reference: {
                            type: 'string',
                            example: 'null',
                          },
                          account_id: {
                            type: 'string',
                            example: '',
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-06-20T10:30:58.965949-05:00',
                          },
                          updated_at: {
                            type: 'string',
                            example: '2022-06-20T10:30:58.965949-05:00',
                          },
                          customer: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'string',
                                example: '25d24c6f-695f-3f3a-bb58-5baa2348',
                              },
                              name: {
                                type: 'string',
                                example: 'Test Customer',
                              },
                              email: {
                                type: 'string',
                                example: 'testcustomer@gmail.com',
                              },
                              phone_number: {
                                type: 'string',
                                example: '8000000000',
                              },
                              created_at: {
                                type: 'string',
                                example: '2022-07-11T06:05:59.99023Z',
                              },
                            },
                            example: {
                              id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                              name: 'Test Customer',
                              email: 'testcustomer@gmail.com',
                              phone_number: '8000000000',
                              created_at: '2022-07-11T06:05:59.99023Z',
                            },
                          },
                          source: {
                            type: 'object',
                            properties: {
                              bank_name: {
                                type: 'string',
                                example: 'Kuda Bank',
                              },
                              bank_code: {},
                              account_name: {
                                type: 'string',
                                example: 'Test Customer',
                              },
                              account_number: {
                                type: 'string',
                                example: '1400123000',
                              },
                            },
                            example: {
                              bank_name: 'Kuda Bank',
                              bank_code: null,
                              account_name: 'Test Customer',
                              account_number: '1400123000',
                            },
                          },
                        },
                        example: {
                          id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                          status: 'SUCCESS',
                          entry: 'CREDIT',
                          channel: 'ACCOUNT',
                          type: 'FUNDING',
                          amount: '10000',
                          fee: '5',
                          currency: 'NGN',
                          summary: 'Test funding',
                          reason: 'null',
                          reference: 'null',
                          account_id: '',
                          created_at: '2022-06-20T10:30:58.965949-05:00',
                          updated_at: '2022-06-20T10:30:58.965949-05:00',
                          customer: {
                            id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                            name: 'Test Customer',
                            email: 'testcustomer@gmail.com',
                            phone_number: '8000000000',
                            created_at: '2022-07-11T06:05:59.99023Z',
                          },
                          source: {
                            bank_name: 'Kuda Bank',
                            bank_code: null,
                            account_name: 'Test Customer',
                            account_number: '1400123000',
                          },
                        },
                      },
                      example: [
                        {
                          id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                          status: 'SUCCESS',
                          entry: 'CREDIT',
                          channel: 'ACCOUNT',
                          type: 'FUNDING',
                          amount: '10000',
                          fee: '5',
                          currency: 'NGN',
                          summary: 'Test funding',
                          reason: 'null',
                          reference: 'null',
                          account_id: '',
                          created_at: '2022-06-20T10:30:58.965949-05:00',
                          updated_at: '2022-06-20T10:30:58.965949-05:00',
                          customer: {
                            id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                            name: 'Test Customer',
                            email: 'testcustomer@gmail.com',
                            phone_number: '8000000000',
                            created_at: '2022-07-11T06:05:59.99023Z',
                          },
                          source: {
                            bank_name: 'Kuda Bank',
                            bank_code: null,
                            account_name: 'Test Customer',
                            account_number: '1400123000',
                          },
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Customer transactions fetched successfully',
                    data: [
                      {
                        id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                        status: 'SUCCESS',
                        entry: 'CREDIT',
                        channel: 'ACCOUNT',
                        type: 'FUNDING',
                        amount: '10000',
                        fee: '5',
                        currency: 'NGN',
                        summary: 'Test funding',
                        reason: 'null',
                        reference: 'null',
                        account_id: '',
                        created_at: '2022-06-20T10:30:58.965949-05:00',
                        updated_at: '2022-06-20T10:30:58.965949-05:00',
                        customer: {
                          id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                          name: 'Test Customer',
                          email: 'testcustomer@gmail.com',
                          phone_number: '8000000000',
                          created_at: '2022-07-11T06:05:59.99023Z',
                        },
                        source: {
                          bank_name: 'Kuda Bank',
                          bank_code: null,
                          account_name: 'Test Customer',
                          account_number: '1400123000',
                        },
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Customer transactions fetched successfully',
                  data: [
                    {
                      id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                      status: 'SUCCESS',
                      entry: 'CREDIT',
                      channel: 'ACCOUNT',
                      type: 'FUNDING',
                      amount: '10000',
                      fee: '5',
                      currency: 'NGN',
                      summary: 'Test funding',
                      reason: 'null',
                      reference: 'null',
                      account_id: '',
                      created_at: '2022-06-20T10:30:58.965949-05:00',
                      updated_at: '2022-06-20T10:30:58.965949-05:00',
                      customer: {
                        id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                        name: 'Test Customer',
                        email: 'testcustomer@gmail.com',
                        phone_number: '8000000000',
                        created_at: '2022-07-11T06:05:59.99023Z',
                      },
                      source: {
                        bank_name: 'Kuda Bank',
                        bank_code: null,
                        account_name: 'Test Customer',
                        account_number: '1400123000',
                      },
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/{customer_id}/virtual-account': {
      get: {
        summary: 'Get Customer Virtual Accounts',
        description:
          'This resource allows for the retrieval of virtual accounts created for a customer on Maplerad.',
        operationId: 'getV1CustomersCustomerIdVirtualAccount',
        parameters: [
          {
            name: 'customer_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully fetched details',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                          },
                          bank_name: {
                            type: 'string',
                            example: 'VFD MFB',
                          },
                          account_number: {
                            type: 'string',
                            example: '5516529907',
                          },
                          account_name: {
                            type: 'string',
                            example: 'John Doe',
                          },
                          currency: {
                            type: 'string',
                            example: 'NGN',
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-05-24T09:25:51.738654-05:00',
                          },
                        },
                        example: {
                          id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                          bank_name: 'VFD MFB',
                          account_number: '5516529907',
                          account_name: 'John Doe',
                          currency: 'NGN',
                          created_at: '2022-05-24T09:25:51.738654-05:00',
                        },
                      },
                      example: [
                        {
                          id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                          bank_name: 'VFD MFB',
                          account_number: '5516529907',
                          account_name: 'John Doe',
                          currency: 'NGN',
                          created_at: '2022-05-24T09:25:51.738654-05:00',
                        },
                        {
                          id: '89aed690-7a5f-4fe7-aa74-fdb793f72a49',
                          bank_name: 'VFD MFB',
                          account_number: '5107448201',
                          account_name: 'John Doe',
                          currency: 'NGN',
                          created_at: '2022-05-24T09:34:09.98264-05:00',
                        },
                        {
                          id: 'f8bdefd2-c000-41e8-9967-53beb7413cf4',
                          bank_name: 'Maplerad',
                          account_number: '3466198242',
                          account_name: 'John Doe',
                          currency: 'USD',
                          created_at: '2025-03-13T20:53:41.68088+01:00',
                          require_consent: false,
                          consented: false,
                          consent_url: null,
                          reference: null,
                          iban: [
                            {
                              instruction_type: 'ACH',
                              routing_number: '66988434',
                              bank_name: 'Maplerad',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '6243791873',
                              account_name: 'John Doe',
                              memo: 'MPR2021',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                            {
                              instruction_type: 'FEDWIRE',
                              routing_number: '48916510',
                              bank_name: 'Maplerad',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '3219202781',
                              account_name: 'John Doe',
                              memo: 'MPR2021',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                          eur: [],
                        },
                        {
                          id: 'b7b233ab-c4a4-46de-b234-3d29db0ef80d',
                          bank_name: 'Maplerad',
                          account_number: '8369676840',
                          account_name: 'John Doe',
                          currency: 'EUR',
                          created_at: '2025-03-13T20:55:08.189254+01:00',
                          require_consent: false,
                          consented: false,
                          consent_url: null,
                          reference: null,
                          iban: [],
                          eur: [
                            {
                              instruction_type: 'SEPA',
                              bank_name: 'Maplerad',
                              account_number: 'IE07MODR88435395442120',
                              account_name: 'John Doe',
                              bic: 'MODRIE22XOO',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                        },
                        {
                          id: '7551c226-fe9b-4a3f-a0ac-c9fac2f90c41',
                          bank_name: 'Maplerad',
                          account_number: '6634655362',
                          account_name: 'John Doe',
                          currency: 'EUR',
                          created_at: '2025-03-14T04:16:43.616725+01:00',
                          require_consent: false,
                          consented: false,
                          consent_url: null,
                          reference: null,
                          iban: [],
                          eur: [
                            {
                              instruction_type: 'SEPA',
                              bank_name: 'Maplerad',
                              account_number: 'IE07MODR45087720423762',
                              account_name: 'John Doe',
                              bic: 'MODRIE22XOO',
                              institution_address:
                                '12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully fetched details',
                    data: [
                      {
                        id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                        bank_name: 'VFD MFB',
                        account_number: '5516529907',
                        account_name: 'John Doe',
                        currency: 'NGN',
                        created_at: '2022-05-24T09:25:51.738654-05:00',
                      },
                      {
                        id: '89aed690-7a5f-4fe7-aa74-fdb793f72a49',
                        bank_name: 'VFD MFB',
                        account_number: '5107448201',
                        account_name: 'John Doe',
                        currency: 'NGN',
                        created_at: '2022-05-24T09:34:09.98264-05:00',
                      },
                      {
                        id: 'f8bdefd2-c000-41e8-9967-53beb7413cf4',
                        bank_name: 'Maplerad',
                        account_number: '3466198242',
                        account_name: 'John Doe',
                        currency: 'USD',
                        created_at: '2025-03-13T20:53:41.68088+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [
                          {
                            instruction_type: 'ACH',
                            routing_number: '66988434',
                            bank_name: 'Maplerad',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '6243791873',
                            account_name: 'John Doe',
                            memo: 'MPR2021',
                            swift_code: '',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                          {
                            instruction_type: 'FEDWIRE',
                            routing_number: '48916510',
                            bank_name: 'Maplerad',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '3219202781',
                            account_name: 'John Doe',
                            memo: 'MPR2021',
                            swift_code: '',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                        eur: [],
                      },
                      {
                        id: 'b7b233ab-c4a4-46de-b234-3d29db0ef80d',
                        bank_name: 'Maplerad',
                        account_number: '8369676840',
                        account_name: 'John Doe',
                        currency: 'EUR',
                        created_at: '2025-03-13T20:55:08.189254+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [],
                        eur: [
                          {
                            instruction_type: 'SEPA',
                            bank_name: 'Maplerad',
                            account_number: 'IE07MODR88435395442120',
                            account_name: 'John Doe',
                            bic: 'MODRIE22XOO',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                      },
                      {
                        id: '7551c226-fe9b-4a3f-a0ac-c9fac2f90c41',
                        bank_name: 'Maplerad',
                        account_number: '6634655362',
                        account_name: 'John Doe',
                        currency: 'EUR',
                        created_at: '2025-03-14T04:16:43.616725+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [],
                        eur: [
                          {
                            instruction_type: 'SEPA',
                            bank_name: 'Maplerad',
                            account_number: 'IE07MODR45087720423762',
                            account_name: 'John Doe',
                            bic: 'MODRIE22XOO',
                            institution_address:
                              '12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully fetched details',
                  data: [
                    {
                      id: '3f5f2c52-80a6-4932-be9c-7c4017ec7334',
                      bank_name: 'VFD MFB',
                      account_number: '5516529907',
                      account_name: 'John Doe',
                      currency: 'NGN',
                      created_at: '2022-05-24T09:25:51.738654-05:00',
                    },
                    {
                      id: '89aed690-7a5f-4fe7-aa74-fdb793f72a49',
                      bank_name: 'VFD MFB',
                      account_number: '5107448201',
                      account_name: 'John Doe',
                      currency: 'NGN',
                      created_at: '2022-05-24T09:34:09.98264-05:00',
                    },
                    {
                      id: 'f8bdefd2-c000-41e8-9967-53beb7413cf4',
                      bank_name: 'Maplerad',
                      account_number: '3466198242',
                      account_name: 'John Doe',
                      currency: 'USD',
                      created_at: '2025-03-13T20:53:41.68088+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [
                        {
                          instruction_type: 'ACH',
                          routing_number: '66988434',
                          bank_name: 'Maplerad',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '6243791873',
                          account_name: 'John Doe',
                          memo: 'MPR2021',
                          swift_code: '',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                        {
                          instruction_type: 'FEDWIRE',
                          routing_number: '48916510',
                          bank_name: 'Maplerad',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '3219202781',
                          account_name: 'John Doe',
                          memo: 'MPR2021',
                          swift_code: '',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                      eur: [],
                    },
                    {
                      id: 'b7b233ab-c4a4-46de-b234-3d29db0ef80d',
                      bank_name: 'Maplerad',
                      account_number: '8369676840',
                      account_name: 'John Doe',
                      currency: 'EUR',
                      created_at: '2025-03-13T20:55:08.189254+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [],
                      eur: [
                        {
                          instruction_type: 'SEPA',
                          bank_name: 'Maplerad',
                          account_number: 'IE07MODR88435395442120',
                          account_name: 'John Doe',
                          bic: 'MODRIE22XOO',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                    },
                    {
                      id: '7551c226-fe9b-4a3f-a0ac-c9fac2f90c41',
                      bank_name: 'Maplerad',
                      account_number: '6634655362',
                      account_name: 'John Doe',
                      currency: 'EUR',
                      created_at: '2025-03-14T04:16:43.616725+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [],
                      eur: [
                        {
                          instruction_type: 'SEPA',
                          bank_name: 'Maplerad',
                          account_number: 'IE07MODR45087720423762',
                          account_name: 'John Doe',
                          bic: 'MODRIE22XOO',
                          institution_address:
                            '12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/customers/update': {
      patch: {
        summary: 'Update Customer',
        description: 'This resource is used to update customer information.',
        operationId: 'patchV1CustomersUpdate',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description: 'The id of the customer',
                    default: '1422c261d1dd4daeab887d2cf347cf2a',
                  },
                  first_name: {
                    type: 'string',
                    description: 'Update customer first name',
                  },
                  middle_name: {
                    type: 'string',
                    description: 'Update customer middle name',
                  },
                  last_name: {
                    type: 'string',
                    description: 'Update customer last name',
                  },
                  photo: {
                    type: 'string',
                    description: 'To update the photo url',
                  },
                  identity: {
                    type: 'object',
                    properties: {
                      type: {
                        type: 'string',
                        description:
                          'The identity type to verify the customer.',
                        default: 'NIN',
                      },
                      image: {
                        type: 'string',
                        description: 'The URL to the uploaded document',
                        default: 'null',
                      },
                      number: {
                        type: 'string',
                        description: "The document's number",
                        default: '0123456789',
                      },
                      country: {
                        type: 'string',
                        description:
                          'The country short-code for the identity. NG for Nigeria, GH for Ghana, US for United States. etc.',
                        default: 'NG',
                      },
                    },
                  },
                  phone: {
                    type: 'object',
                    properties: {
                      phone_country_code: {
                        type: 'string',
                        default: '+234',
                      },
                      phone_number: {
                        type: 'string',
                        default: '8123456789',
                      },
                    },
                  },
                  address: {
                    type: 'object',
                    properties: {
                      street: {
                        type: 'string',
                        default: '63 banana island',
                      },
                      street2: {
                        type: 'string',
                        default: 'null',
                      },
                      city: {
                        type: 'string',
                        default: 'Isolo',
                      },
                      state: {
                        type: 'string',
                        default: 'Lagos',
                      },
                      country: {
                        type: 'string',
                        default: 'NG',
                      },
                      postal_code: {
                        type: 'string',
                        default: '770835',
                      },
                    },
                  },
                  nationality: {
                    type: 'string',
                    default: 'NG',
                  },
                  identification_number: {
                    type: 'string',
                  },
                },
                required: ['customer_id'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/crypto': {
      post: {
        summary: 'Generate Address',
        description:
          'Creates a unique stablecoin deposit address for your customer.',
        operationId: 'postV1Crypto',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description:
                      'The ID of the customer the address belongs to.',
                  },
                  coin: {
                    type: 'string',
                    description: 'The cryptocurrency code',
                    default: 'USDC',
                  },
                  chain: {
                    type: 'string',
                    description: 'The blockchain network for the currency.',
                    default: 'solana',
                  },
                  offramp: {
                    type: 'boolean',
                    description:
                      'Set to `true` to automatically offramp (converting crypto to fiat) deposits to `USD`. Defaults to `false`.',
                    default: 'false',
                  },
                },
                required: ['customer_id', 'coin', 'chain'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully created blockchain address',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'ce8191f5-2d1d-4729-945c-ca7fd3d4bc10',
                        },
                        address: {
                          type: 'string',
                          example:
                            'BvH5k5WVFCnTeMSfGHD16JJeaM2PJRWt2T6QfzPa6uvc',
                        },
                        chain: {
                          type: 'string',
                          example: 'solana',
                        },
                        coin: {
                          type: 'string',
                          example: 'usdc',
                        },
                        offramp: {
                          type: 'boolean',
                          example: false,
                        },
                        active: {
                          type: 'boolean',
                          example: true,
                        },
                      },
                      example: {
                        id: 'ce8191f5-2d1d-4729-945c-ca7fd3d4bc10',
                        address: 'BvH5k5WVFCnTeMSfGHD16JJeaM2PJRWt2T6QfzPa6uvc',
                        chain: 'solana',
                        coin: 'usdc',
                        offramp: false,
                        active: true,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully created blockchain address',
                    data: {
                      id: 'ce8191f5-2d1d-4729-945c-ca7fd3d4bc10',
                      address: 'BvH5k5WVFCnTeMSfGHD16JJeaM2PJRWt2T6QfzPa6uvc',
                      chain: 'solana',
                      coin: 'usdc',
                      offramp: false,
                      active: true,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successfully created blockchain address',
                  data: {
                    id: 'ce8191f5-2d1d-4729-945c-ca7fd3d4bc10',
                    address: 'BvH5k5WVFCnTeMSfGHD16JJeaM2PJRWt2T6QfzPa6uvc',
                    chain: 'solana',
                    coin: 'usdc',
                    offramp: false,
                    active: true,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/crypto/transfer': {
      post: {
        summary: 'Transfer',
        description:
          'This endpoint allows you to initiate a stablecoin withdrawal.',
        operationId: 'postV1CryptoTransfer',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'integer',
                  },
                  reference: {
                    type: 'string',
                    description: 'A unique identifier for the transaction',
                  },
                  reason: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                    description:
                      'Beneficiary crypto address. Please ensure that you confirm the address before making transfer.',
                  },
                  chain: {
                    type: 'string',
                  },
                  coin: {
                    type: 'string',
                    default: 'usdc',
                  },
                  funding_source: {
                    type: 'string',
                    description:
                      "The funding source is used to select the wallet to be debited for the transfer. The destination coin's equivalent value is debited from the source currency and exchanged to fund the transfer. USD is the only acceptable value for this field.",
                  },
                },
                required: ['amount', 'address', 'chain', 'coin'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '896b0a9e-38c0-4a4f-b6df-62ef24f2d3f6',
                        },
                        amount: {
                          type: 'integer',
                          example: 100,
                        },
                        fee: {
                          type: 'integer',
                          example: 0,
                        },
                        address: {
                          type: 'string',
                          example: 'CS8AtxtCZZVwCkvxZHJf',
                        },
                        chain: {
                          type: 'string',
                          example: 'solana',
                        },
                        hash: {
                          type: 'string',
                          example: 'dbedcbb9-49ef-4822-a208-b2f349dccd45',
                        },
                        coin: {
                          type: 'string',
                          example: 'usdc',
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        created_at: {
                          type: 'string',
                          example: '2026-03-15T05:21:49.464044009Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2026-03-15T05:21:49.726569701Z',
                        },
                      },
                      example: {
                        id: '896b0a9e-38c0-4a4f-b6df-62ef24f2d3f6',
                        amount: 100,
                        fee: 0,
                        address: 'CS8AtxtCZZVwCkvxZHJf',
                        chain: 'solana',
                        hash: 'dbedcbb9-49ef-4822-a208-b2f349dccd45',
                        coin: 'usdc',
                        currency: 'USD',
                        status: 'SUCCESS',
                        created_at: '2026-03-15T05:21:49.464044009Z',
                        updated_at: '2026-03-15T05:21:49.726569701Z',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successful',
                    data: {
                      id: '896b0a9e-38c0-4a4f-b6df-62ef24f2d3f6',
                      amount: 100,
                      fee: 0,
                      address: 'CS8AtxtCZZVwCkvxZHJf',
                      chain: 'solana',
                      hash: 'dbedcbb9-49ef-4822-a208-b2f349dccd45',
                      coin: 'usdc',
                      currency: 'USD',
                      status: 'SUCCESS',
                      created_at: '2026-03-15T05:21:49.464044009Z',
                      updated_at: '2026-03-15T05:21:49.726569701Z',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successful',
                  data: {
                    id: '896b0a9e-38c0-4a4f-b6df-62ef24f2d3f6',
                    amount: 100,
                    fee: 0,
                    address: 'CS8AtxtCZZVwCkvxZHJf',
                    chain: 'solana',
                    hash: 'dbedcbb9-49ef-4822-a208-b2f349dccd45',
                    coin: 'usdc',
                    currency: 'USD',
                    status: 'SUCCESS',
                    created_at: '2026-03-15T05:21:49.464044009Z',
                    updated_at: '2026-03-15T05:21:49.726569701Z',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/crypto/{address_id}': {
      get: {
        summary: 'Get Address',
        description: '',
        operationId: 'getV1CryptoAddressId',
        parameters: [
          {
            name: 'address_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully fetched blockchain address',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'd6aecfc6-f1d6-4e3e-ba30-05377562efba',
                        },
                        address: {
                          type: 'string',
                          example: '0xu6Ai79o1h5G1K6Vyh2oprQi24N240Vj9Wp5ieYZW',
                        },
                        chain: {
                          type: 'string',
                          example: 'base',
                        },
                        coin: {
                          type: 'string',
                          example: 'usdc',
                        },
                        offramp: {
                          type: 'boolean',
                          example: true,
                        },
                        active: {
                          type: 'boolean',
                          example: true,
                        },
                      },
                      example: {
                        id: 'd6aecfc6-f1d6-4e3e-ba30-05377562efba',
                        address: '0xu6Ai79o1h5G1K6Vyh2oprQi24N240Vj9Wp5ieYZW',
                        chain: 'base',
                        coin: 'usdc',
                        offramp: true,
                        active: true,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully fetched blockchain address',
                    data: {
                      id: 'd6aecfc6-f1d6-4e3e-ba30-05377562efba',
                      address: '0xu6Ai79o1h5G1K6Vyh2oprQi24N240Vj9Wp5ieYZW',
                      chain: 'base',
                      coin: 'usdc',
                      offramp: true,
                      active: true,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successfully fetched blockchain address',
                  data: {
                    id: 'd6aecfc6-f1d6-4e3e-ba30-05377562efba',
                    address: '0xu6Ai79o1h5G1K6Vyh2oprQi24N240Vj9Wp5ieYZW',
                    chain: 'base',
                    coin: 'usdc',
                    offramp: true,
                    active: true,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/crypto/wallets/{customer_id}': {
      get: {
        summary: 'Get Addresses',
        description: '',
        operationId: 'getV1CryptoWalletsCustomerId',
        parameters: [
          {
            name: 'customer_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully fetched blockchain address',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '65d8907e-145b-4d5c-9899-e0de064a03f6',
                          },
                          address: {
                            type: 'string',
                            example: 'c79db51a-52a6-458f-b2f8-2f021625f061',
                          },
                          chain: {
                            type: 'string',
                            example: 'base',
                          },
                          coin: {
                            type: 'string',
                            example: 'usdc',
                          },
                          offramp: {
                            type: 'boolean',
                            example: false,
                          },
                          active: {
                            type: 'boolean',
                            example: true,
                          },
                        },
                        example: {
                          id: '65d8907e-145b-4d5c-9899-e0de064a03f6',
                          address: 'c79db51a-52a6-458f-b2f8-2f021625f061',
                          chain: 'base',
                          coin: 'usdc',
                          offramp: false,
                          active: true,
                        },
                      },
                      example: [
                        {
                          id: '65d8907e-145b-4d5c-9899-e0de064a03f6',
                          address: 'c79db51a-52a6-458f-b2f8-2f021625f061',
                          chain: 'base',
                          coin: 'usdc',
                          offramp: false,
                          active: true,
                        },
                        {
                          id: 'ba207d0d-ae09-4961-b312-152ae281b5d7',
                          address: '14043c10-b184-4241-8993-a386cbfc9b42',
                          chain: 'solana',
                          coin: 'usdc',
                          offramp: false,
                          active: true,
                        },
                        {
                          id: '9874c301-5bba-4c32-abe5-46cc485b2830',
                          address: 'c825c3fa-2e43-41e9-8d23-d8bc2600bf53',
                          chain: 'solana',
                          coin: 'pyusd',
                          offramp: false,
                          active: true,
                        },
                        {
                          id: '79739a44-14b6-4f03-9d18-2859be031d6b',
                          address: 'df1c25e1-0ce5-4900-b659-cb084421f8d4',
                          chain: 'polygon',
                          coin: 'usdc',
                          offramp: true,
                          active: true,
                        },
                        {
                          id: '6dbbe554-fc15-4991-a892-a9687e0aaac3',
                          address: '1b5c1c21-4d20-4736-a364-66494f1db7bd',
                          chain: 'base',
                          coin: 'usdc',
                          offramp: false,
                          active: true,
                        },
                        {
                          id: '6406973f-4965-4050-ae13-b8b369cc2553',
                          address: '0x9Vod4Z4hT4BnG2U9gFWSK6805PTv2fo5nl0MaFhU',
                          chain: 'polygon',
                          coin: 'usdt',
                          offramp: false,
                          active: true,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully fetched blockchain address',
                    data: [
                      {
                        id: '65d8907e-145b-4d5c-9899-e0de064a03f6',
                        address: 'c79db51a-52a6-458f-b2f8-2f021625f061',
                        chain: 'base',
                        coin: 'usdc',
                        offramp: false,
                        active: true,
                      },
                      {
                        id: 'ba207d0d-ae09-4961-b312-152ae281b5d7',
                        address: '14043c10-b184-4241-8993-a386cbfc9b42',
                        chain: 'solana',
                        coin: 'usdc',
                        offramp: false,
                        active: true,
                      },
                      {
                        id: '9874c301-5bba-4c32-abe5-46cc485b2830',
                        address: 'c825c3fa-2e43-41e9-8d23-d8bc2600bf53',
                        chain: 'solana',
                        coin: 'pyusd',
                        offramp: false,
                        active: true,
                      },
                      {
                        id: '79739a44-14b6-4f03-9d18-2859be031d6b',
                        address: 'df1c25e1-0ce5-4900-b659-cb084421f8d4',
                        chain: 'polygon',
                        coin: 'usdc',
                        offramp: true,
                        active: true,
                      },
                      {
                        id: '6dbbe554-fc15-4991-a892-a9687e0aaac3',
                        address: '1b5c1c21-4d20-4736-a364-66494f1db7bd',
                        chain: 'base',
                        coin: 'usdc',
                        offramp: false,
                        active: true,
                      },
                      {
                        id: '6406973f-4965-4050-ae13-b8b369cc2553',
                        address: '0x9Vod4Z4hT4BnG2U9gFWSK6805PTv2fo5nl0MaFhU',
                        chain: 'polygon',
                        coin: 'usdt',
                        offramp: false,
                        active: true,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'successfully fetched blockchain address',
                  data: [
                    {
                      id: '65d8907e-145b-4d5c-9899-e0de064a03f6',
                      address: 'c79db51a-52a6-458f-b2f8-2f021625f061',
                      chain: 'base',
                      coin: 'usdc',
                      offramp: false,
                      active: true,
                    },
                    {
                      id: 'ba207d0d-ae09-4961-b312-152ae281b5d7',
                      address: '14043c10-b184-4241-8993-a386cbfc9b42',
                      chain: 'solana',
                      coin: 'usdc',
                      offramp: false,
                      active: true,
                    },
                    {
                      id: '9874c301-5bba-4c32-abe5-46cc485b2830',
                      address: 'c825c3fa-2e43-41e9-8d23-d8bc2600bf53',
                      chain: 'solana',
                      coin: 'pyusd',
                      offramp: false,
                      active: true,
                    },
                    {
                      id: '79739a44-14b6-4f03-9d18-2859be031d6b',
                      address: 'df1c25e1-0ce5-4900-b659-cb084421f8d4',
                      chain: 'polygon',
                      coin: 'usdc',
                      offramp: true,
                      active: true,
                    },
                    {
                      id: '6dbbe554-fc15-4991-a892-a9687e0aaac3',
                      address: '1b5c1c21-4d20-4736-a364-66494f1db7bd',
                      chain: 'base',
                      coin: 'usdc',
                      offramp: false,
                      active: true,
                    },
                    {
                      id: '6406973f-4965-4050-ae13-b8b369cc2553',
                      address: '0x9Vod4Z4hT4BnG2U9gFWSK6805PTv2fo5nl0MaFhU',
                      chain: 'polygon',
                      coin: 'usdt',
                      offramp: false,
                      active: true,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/crypto/:id': {
      patch: {
        summary: 'Update OffRamp',
        description: '',
        operationId: 'patchV1CryptoId',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  offramp: {
                    type: 'boolean',
                    description:
                      'When OffRamp is set as `true` stablecoin deposit gets converted to USD and credited on business wallet, else Crypto wallet gets credited',
                    default: 'false',
                  },
                },
                required: ['offramp'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account': {
      post: {
        summary: 'Create Static Account',
        description:
          'This enables the creation of a virtual account for a customer. Money paid into this account gets deposited into the business wallet.',
        operationId: 'postV1CollectionsVirtualAccount',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description:
                      'The ID of the customer (created on Maplerad).',
                    default: '9d0831a3-ffe2-4221-8441-ad3ff56ce95d',
                  },
                  currency: {
                    type: 'string',
                    description: 'The currency to be stored in this account.',
                    default: 'NGN',
                  },
                  preferred_bank: {
                    type: 'string',
                    description:
                      'The bank code of the bank you prefer. This can be gotten from [get institutions](https://maplerad.dev/reference/get-all-institutions) while setting type as VIRTUAL.',
                    default: '631',
                  },
                },
                required: ['customer_id', 'currency'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Account created successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '05859dd9-494e-4378-bb11-09aaea98558e',
                        },
                        bank_name: {
                          type: 'string',
                          example: 'WEMA BANK',
                        },
                        account_number: {
                          type: 'string',
                          example: '9003001001',
                        },
                        account_name: {
                          type: 'string',
                          example: 'JOHN DOE',
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        created_at: {
                          type: 'string',
                          example: '2022-03-17T23:26:48.73051-05:00',
                        },
                      },
                      example: {
                        id: '05859dd9-494e-4378-bb11-09aaea98558e',
                        bank_name: 'WEMA BANK',
                        account_number: '9003001001',
                        account_name: 'JOHN DOE',
                        currency: 'NGN',
                        created_at: '2022-03-17T23:26:48.73051-05:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Account created successfully',
                    data: {
                      id: '05859dd9-494e-4378-bb11-09aaea98558e',
                      bank_name: 'WEMA BANK',
                      account_number: '9003001001',
                      account_name: 'JOHN DOE',
                      currency: 'NGN',
                      created_at: '2022-03-17T23:26:48.73051-05:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Account created successfully',
                  data: {
                    id: '05859dd9-494e-4378-bb11-09aaea98558e',
                    bank_name: 'WEMA BANK',
                    account_number: '9003001001',
                    account_name: 'JOHN DOE',
                    currency: 'NGN',
                    created_at: '2022-03-17T23:26:48.73051-05:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/transactions/verify/{id}': {
      get: {
        summary: 'Verify Transaction',
        description:
          'This resource verifies a collection transaction by its ID.',
        operationId: 'getV1TransactionsVerifyId',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'transaction ID',
            schema: {
              type: 'string',
              description: 'transaction ID',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Transaction fetched',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'cf454690-ebb2-4cd6-b51d-a96eb983eef1',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        entry: {
                          type: 'string',
                          example: 'CREDIT',
                        },
                        type: {
                          type: 'string',
                          example: 'COLLECTION',
                        },
                        amount: {
                          type: 'integer',
                          example: 100000000,
                        },
                        fee: {
                          type: 'integer',
                          example: 75000,
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        channel: {
                          type: 'string',
                          example: 'BANKTRANSFER',
                        },
                        summary: {
                          type: 'string',
                          example:
                            'Virtual Account Collection - Test Customer - 1400123000 - Kuda Bank',
                        },
                        reason: {},
                        reference: {},
                        account_id: {
                          type: 'string',
                          example: '08a57869-7f2a-413c-b3c5-862598b54bdc',
                        },
                        created_at: {
                          type: 'string',
                          example: '2022-07-12T15:47:51.293441Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2022-07-12T15:47:51.293441Z',
                        },
                        customer: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: '25d24c6f-695f-3f3a-bb58-5baa2348',
                            },
                            name: {
                              type: 'string',
                              example: 'Test Customer',
                            },
                            email: {
                              type: 'string',
                              example: 'testcustomer@gmail.com',
                            },
                            phone_number: {
                              type: 'string',
                              example: '8000000000',
                            },
                            created_at: {
                              type: 'string',
                              example: '2022-07-11T06:05:59.99023Z',
                            },
                          },
                          example: {
                            id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                            name: 'Test Customer',
                            email: 'testcustomer@gmail.com',
                            phone_number: '8000000000',
                            created_at: '2022-07-11T06:05:59.99023Z',
                          },
                        },
                        source: {
                          type: 'object',
                          properties: {
                            bank_name: {
                              type: 'string',
                              example: 'Kuda Bank',
                            },
                            bank_code: {},
                            account_name: {
                              type: 'string',
                              example: 'Test Customer',
                            },
                            account_number: {
                              type: 'string',
                              example: '1400123000',
                            },
                          },
                          example: {
                            bank_name: 'Kuda Bank',
                            bank_code: null,
                            account_name: 'Test Customer',
                            account_number: '1400123000',
                          },
                        },
                      },
                      example: {
                        id: 'cf454690-ebb2-4cd6-b51d-a96eb983eef1',
                        status: 'SUCCESS',
                        entry: 'CREDIT',
                        type: 'COLLECTION',
                        amount: 100000000,
                        fee: 75000,
                        currency: 'NGN',
                        channel: 'BANKTRANSFER',
                        summary:
                          'Virtual Account Collection - Test Customer - 1400123000 - Kuda Bank',
                        reason: null,
                        reference: null,
                        account_id: '08a57869-7f2a-413c-b3c5-862598b54bdc',
                        created_at: '2022-07-12T15:47:51.293441Z',
                        updated_at: '2022-07-12T15:47:51.293441Z',
                        customer: {
                          id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                          name: 'Test Customer',
                          email: 'testcustomer@gmail.com',
                          phone_number: '8000000000',
                          created_at: '2022-07-11T06:05:59.99023Z',
                        },
                        source: {
                          bank_name: 'Kuda Bank',
                          bank_code: null,
                          account_name: 'Test Customer',
                          account_number: '1400123000',
                        },
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Transaction fetched',
                    data: {
                      id: 'cf454690-ebb2-4cd6-b51d-a96eb983eef1',
                      status: 'SUCCESS',
                      entry: 'CREDIT',
                      type: 'COLLECTION',
                      amount: 100000000,
                      fee: 75000,
                      currency: 'NGN',
                      channel: 'BANKTRANSFER',
                      summary:
                        'Virtual Account Collection - Test Customer - 1400123000 - Kuda Bank',
                      reason: null,
                      reference: null,
                      account_id: '08a57869-7f2a-413c-b3c5-862598b54bdc',
                      created_at: '2022-07-12T15:47:51.293441Z',
                      updated_at: '2022-07-12T15:47:51.293441Z',
                      customer: {
                        id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                        name: 'Test Customer',
                        email: 'testcustomer@gmail.com',
                        phone_number: '8000000000',
                        created_at: '2022-07-11T06:05:59.99023Z',
                      },
                      source: {
                        bank_name: 'Kuda Bank',
                        bank_code: null,
                        account_name: 'Test Customer',
                        account_number: '1400123000',
                      },
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Transaction fetched',
                  data: {
                    id: 'cf454690-ebb2-4cd6-b51d-a96eb983eef1',
                    status: 'SUCCESS',
                    entry: 'CREDIT',
                    type: 'COLLECTION',
                    amount: 100000000,
                    fee: 75000,
                    currency: 'NGN',
                    channel: 'BANKTRANSFER',
                    summary:
                      'Virtual Account Collection - Test Customer - 1400123000 - Kuda Bank',
                    reason: null,
                    reference: null,
                    account_id: '08a57869-7f2a-413c-b3c5-862598b54bdc',
                    created_at: '2022-07-12T15:47:51.293441Z',
                    updated_at: '2022-07-12T15:47:51.293441Z',
                    customer: {
                      id: '25d24c6f-695f-3f3a-bb58-5baa2348',
                      name: 'Test Customer',
                      email: 'testcustomer@gmail.com',
                      phone_number: '8000000000',
                      created_at: '2022-07-11T06:05:59.99023Z',
                    },
                    source: {
                      bank_name: 'Kuda Bank',
                      bank_code: null,
                      account_name: 'Test Customer',
                      account_number: '1400123000',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/momo': {
      post: {
        summary: 'Mobile Money',
        description:
          'This resource allows a customer to receive mobile money payments.',
        operationId: 'postV1CollectionsMomo',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  account_number: {
                    type: 'string',
                    description:
                      'The phone number which funds will be requested from.',
                    default: '23572826364**',
                  },
                  amount: {
                    type: 'integer',
                    description:
                      'The amount to be debited in the lowest denomination.',
                    default: '1500',
                  },
                  bank_code: {
                    type: 'string',
                    description: "The institution's bank code.",
                    default: '123',
                  },
                  currency: {
                    type: 'string',
                    description: 'The currency to be received.',
                    default: 'XAF',
                  },
                  description: {
                    type: 'string',
                    description:
                      'A description of what the transaction is meant for e.g To get food.',
                    default: 'Buy food',
                  },
                  reference: {
                    type: 'string',
                    description: 'A unique reference for this transaction',
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      counterparty: {
                        type: 'object',
                        properties: {
                          first_name: {
                            type: 'string',
                          },
                          last_name: {
                            type: 'string',
                          },
                          email: {
                            type: 'string',
                          },
                          phone_number: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
                required: [
                  'account_number',
                  'amount',
                  'bank_code',
                  'currency',
                  'description',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example:
                        'Approve payment request to complete transaction',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '30d0cd7c-ce97-49ae-a2bd-aa9e61a41af0',
                        },
                        currency: {
                          type: 'string',
                          example: 'XAF',
                        },
                        status: {
                          type: 'string',
                          example: 'PENDING',
                        },
                        entry: {
                          type: 'string',
                          example: 'CREDIT',
                        },
                        type: {
                          type: 'string',
                          example: 'COLLECTION',
                        },
                        amount: {
                          type: 'integer',
                          example: 1500,
                        },
                        summary: {
                          type: 'string',
                          example: 'ref-09242790',
                        },
                        reason: {
                          type: 'string',
                          example: 'funding',
                        },
                        fee: {
                          type: 'integer',
                          example: 15,
                        },
                        requires_otp: {
                          type: 'boolean',
                          example: true,
                        },
                        otp_instruction: {
                          type: 'object',
                          properties: {
                            details: {
                              type: 'string',
                              example:
                                '1/ Générer un code provisoire en ouvrant l\'application Orange Money Afrique et en sélectionnant "Mon Compte", ou en composant le #144*82# et en effectuant l\'appel.\r\n---\r\n2/ Entrez votre code secret et confirmez.\r\n---\r\n3/Copiez le code que vous avez reçu par SMS et collez-le dans le champ prévu à cet effet.',
                            },
                            length: {
                              type: 'integer',
                              example: 4,
                            },
                          },
                          example: {
                            details:
                              '1/ Générer un code provisoire en ouvrant l\'application Orange Money Afrique et en sélectionnant "Mon Compte", ou en composant le #144*82# et en effectuant l\'appel.\r\n---\r\n2/ Entrez votre code secret et confirmez.\r\n---\r\n3/Copiez le code que vous avez reçu par SMS et collez-le dans le champ prévu à cet effet.',
                            length: 4,
                          },
                        },
                        reference: {
                          type: 'string',
                          example: 'ref-09242790',
                        },
                        created_at: {
                          type: 'string',
                          example: '2023-07-06T17:08:44.19571+01:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2023-07-06T17:08:55.851532+01:00',
                        },
                      },
                      example: {
                        id: '30d0cd7c-ce97-49ae-a2bd-aa9e61a41af0',
                        currency: 'XAF',
                        status: 'PENDING',
                        entry: 'CREDIT',
                        type: 'COLLECTION',
                        amount: 1500,
                        summary: 'ref-09242790',
                        reason: 'funding',
                        fee: 15,
                        requires_otp: true,
                        otp_instruction: {
                          details:
                            '1/ Générer un code provisoire en ouvrant l\'application Orange Money Afrique et en sélectionnant "Mon Compte", ou en composant le #144*82# et en effectuant l\'appel.\r\n---\r\n2/ Entrez votre code secret et confirmez.\r\n---\r\n3/Copiez le code que vous avez reçu par SMS et collez-le dans le champ prévu à cet effet.',
                          length: 4,
                        },
                        reference: 'ref-09242790',
                        created_at: '2023-07-06T17:08:44.19571+01:00',
                        updated_at: '2023-07-06T17:08:55.851532+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Approve payment request to complete transaction',
                    data: {
                      id: '30d0cd7c-ce97-49ae-a2bd-aa9e61a41af0',
                      currency: 'XAF',
                      status: 'PENDING',
                      entry: 'CREDIT',
                      type: 'COLLECTION',
                      amount: 1500,
                      summary: 'ref-09242790',
                      reason: 'funding',
                      fee: 15,
                      requires_otp: true,
                      otp_instruction: {
                        details:
                          '1/ Générer un code provisoire en ouvrant l\'application Orange Money Afrique et en sélectionnant "Mon Compte", ou en composant le #144*82# et en effectuant l\'appel.\r\n---\r\n2/ Entrez votre code secret et confirmez.\r\n---\r\n3/Copiez le code que vous avez reçu par SMS et collez-le dans le champ prévu à cet effet.',
                        length: 4,
                      },
                      reference: 'ref-09242790',
                      created_at: '2023-07-06T17:08:44.19571+01:00',
                      updated_at: '2023-07-06T17:08:55.851532+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Approve payment request to complete transaction',
                  data: {
                    id: '30d0cd7c-ce97-49ae-a2bd-aa9e61a41af0',
                    currency: 'XAF',
                    status: 'PENDING',
                    entry: 'CREDIT',
                    type: 'COLLECTION',
                    amount: 1500,
                    summary: 'ref-09242790',
                    reason: 'funding',
                    fee: 15,
                    requires_otp: true,
                    otp_instruction: {
                      details:
                        '1/ Générer un code provisoire en ouvrant l\'application Orange Money Afrique et en sélectionnant "Mon Compte", ou en composant le #144*82# et en effectuant l\'appel.\r\n---\r\n2/ Entrez votre code secret et confirmez.\r\n---\r\n3/Copiez le code que vous avez reçu par SMS et collez-le dans le champ prévu à cet effet.',
                      length: 4,
                    },
                    reference: 'ref-09242790',
                    created_at: '2023-07-06T17:08:44.19571+01:00',
                    updated_at: '2023-07-06T17:08:55.851532+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/momo/verify-otp': {
      post: {
        summary: 'Verify OTP',
        description:
          'If the transaction requires OTP then we need to call the verify otp endpoint',
        operationId: 'postV1CollectionsMomoVerifyOtp',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  transaction_id: {
                    type: 'string',
                    description: 'The ID of the transaction initiated.',
                    default: 'dad53762-af9f-44e7-b731-d98b909298b3',
                  },
                  otp: {
                    type: 'string',
                    description: 'The OTP received via the mobile number',
                    default: '6550',
                  },
                },
                required: ['transaction_id', 'otp'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'e4155048-9455-40b2-9f21-6e20109cba08',
                        },
                        status: {
                          type: 'string',
                          example: 'PENDING',
                        },
                        currency: {
                          type: 'string',
                          example: 'XOF',
                        },
                        entry: {
                          type: 'string',
                          example: 'CREDIT',
                        },
                        type: {
                          type: 'string',
                          example: 'COLLECTION',
                        },
                        amount: {
                          type: 'integer',
                          example: 1000,
                        },
                        summary: {
                          type: 'string',
                          example: 'birthday gift',
                        },
                        reason: {
                          type: 'string',
                          example: 'birthday gift',
                        },
                        fee: {
                          type: 'integer',
                          example: 20,
                        },
                        reference: {
                          type: 'string',
                          example: 'xof_orange_collection_21',
                        },
                        created_at: {
                          type: 'string',
                          example: '2024-10-02T12:23:04.525136+01:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-10-02T12:28:16.980087+01:00',
                        },
                      },
                      example: {
                        id: 'e4155048-9455-40b2-9f21-6e20109cba08',
                        status: 'PENDING',
                        currency: 'XOF',
                        entry: 'CREDIT',
                        type: 'COLLECTION',
                        amount: 1000,
                        summary: 'birthday gift',
                        reason: 'birthday gift',
                        fee: 20,
                        reference: 'xof_orange_collection_21',
                        created_at: '2024-10-02T12:23:04.525136+01:00',
                        updated_at: '2024-10-02T12:28:16.980087+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successful',
                    data: {
                      id: 'e4155048-9455-40b2-9f21-6e20109cba08',
                      status: 'PENDING',
                      currency: 'XOF',
                      entry: 'CREDIT',
                      type: 'COLLECTION',
                      amount: 1000,
                      summary: 'birthday gift',
                      reason: 'birthday gift',
                      fee: 20,
                      reference: 'xof_orange_collection_21',
                      created_at: '2024-10-02T12:23:04.525136+01:00',
                      updated_at: '2024-10-02T12:28:16.980087+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successful',
                  data: {
                    id: 'e4155048-9455-40b2-9f21-6e20109cba08',
                    status: 'PENDING',
                    currency: 'XOF',
                    entry: 'CREDIT',
                    type: 'COLLECTION',
                    amount: 1000,
                    summary: 'birthday gift',
                    reason: 'birthday gift',
                    fee: 20,
                    reference: 'xof_orange_collection_21',
                    created_at: '2024-10-02T12:23:04.525136+01:00',
                    updated_at: '2024-10-02T12:28:16.980087+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account/usd': {
      post: {
        summary: 'Create Account (USD)',
        description:
          'This enables the creation of a USD virtual account for a customer. This returns a reference which will tell the status of your account request.',
        operationId: 'postV1CollectionsVirtualAccountUsd',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description: 'The ID of the customer (created on Maplerad)',
                    default: '9d0831a3-ffe2-4221-8441-ad3ff56ce95d',
                  },
                  meta: {
                    type: 'object',
                    required: [
                      'identification_number',
                      'employment_status',
                      'employment_description',
                      'nationality',
                      'employer_name',
                      'occupation',
                      'us_residency_status',
                    ],
                    properties: {
                      identification_number: {
                        type: 'string',
                        description: 'For `US` residents ssn, itin, ein',
                        default: 'TN-12364****',
                      },
                      passport_number: {
                        type: 'string',
                        description: 'Depreciated',
                        default: 'DFR647856***',
                      },
                      employment_status: {
                        type: 'string',
                        description: "The individual's employment status",
                        default: 'EMPLOYED',
                      },
                      employment_description: {
                        type: 'string',
                        default: 'Information Technology',
                      },
                      nationality: {
                        type: 'string',
                        description: "ISO code of individual's nationality",
                        default: 'NG',
                      },
                      employer_name: {
                        type: 'string',
                        default: 'Maplerad',
                      },
                      occupation: {
                        type: 'string',
                      },
                      us_residency_status: {
                        type: 'string',
                        default: 'NON_RESIDENT_ALIEN',
                      },
                      documents: {
                        type: 'object',
                        properties: {
                          identification_country: {
                            type: 'string',
                            description:
                              "ISO 3166-1 alpha-2 of individual's nationality",
                            default: 'NG',
                          },
                          identification_image_front: {
                            type: 'string',
                            description:
                              'Identification Image Front is a `required` field. It accepts a data in URI (Uniform Resource Identifier) base64 string',
                            default:
                              'data:(image|application)/(jpeg|jpg|png|heic|heif|pdf);base64,(valid_base_64_data)',
                          },
                          identification_image_back: {
                            type: 'string',
                            description:
                              "The customer's International identification image back, It accepts a data in URI (Uniform Resource Identifier) base64 string",
                            default:
                              'data:(image|application)/(jpeg|jpg|png|heic|heif|pdf);base64,(valid_base_64_data)',
                          },
                          source_of_funds: {
                            type: 'object',
                            properties: {
                              file_name: {
                                type: 'string',
                                default: 'PAYSLIP',
                              },
                              file: {
                                type: 'string',
                                default:
                                  'data:(application)/(pdf);base64,(valid_base_64_data)',
                              },
                            },
                          },
                          proof_of_address: {
                            type: 'object',
                            properties: {
                              file_name: {
                                type: 'string',
                                default: 'PAYSLIP',
                              },
                              file: {
                                type: 'string',
                                default:
                                  'data:(application)/(pdf);base64,(valid_base_64_data)',
                              },
                            },
                          },
                          identification_type: {
                            type: 'string',
                            description:
                              'Identification document type i.e. National Identification Number (NIN)',
                            default: 'PASSPORT',
                          },
                          identification_expiration: {
                            type: 'string',
                            description:
                              'Identification expiration date this is an optional field. Date format i.e. DD-MM-YYYY',
                          },
                        },
                      },
                    },
                  },
                },
                required: ['customer_id', 'meta'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        reference: {
                          type: 'string',
                          example: '66696258-f2d2-4ceb-87ee-7612f07ea705',
                        },
                        status: {
                          type: 'string',
                          example: 'PENDING',
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        kyc_link: {
                          type: 'string',
                          example: 'https://maplerad.com',
                        },
                      },
                      example: {
                        reference: '66696258-f2d2-4ceb-87ee-7612f07ea705',
                        status: 'PENDING',
                        currency: 'USD',
                        kyc_link: 'https://maplerad.com',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully',
                    data: {
                      reference: '66696258-f2d2-4ceb-87ee-7612f07ea705',
                      status: 'PENDING',
                      currency: 'USD',
                      kyc_link: 'https://maplerad.com',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully',
                  data: {
                    reference: '66696258-f2d2-4ceb-87ee-7612f07ea705',
                    status: 'PENDING',
                    currency: 'USD',
                    kyc_link: 'https://maplerad.com',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account/status/{reference}': {
      get: {
        summary: 'Check Account Request Status',
        description:
          'This help to check the status of the USD account request.',
        operationId: 'getV1CollectionsVirtualAccountStatusReference',
        parameters: [
          {
            name: 'reference',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'eacbdf6d-9ae9-4e93-88a8-155128788d89',
            },
            example: 'eacbdf6d-9ae9-4e93-88a8-155128788d89',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        reference: {
                          type: 'string',
                          example: '8cdb5a6c-e5c8-494a-b430-47c30ad4988e',
                        },
                        account_id: {
                          type: 'string',
                          example: '301977d2-a013-41ad-abe3-809b667e1101',
                        },
                        status: {
                          type: 'string',
                          example: 'APPROVED',
                        },
                        message: {
                          type: 'array',
                          items: {
                            type: 'string',
                            example:
                              "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                          },
                          example: [
                            "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                          ],
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        kyc_link: {
                          type: 'string',
                          example: 'https://maplerad.com',
                        },
                      },
                      example: {
                        reference: '8cdb5a6c-e5c8-494a-b430-47c30ad4988e',
                        account_id: '301977d2-a013-41ad-abe3-809b667e1101',
                        status: 'APPROVED',
                        message: [
                          "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                        ],
                        currency: 'USD',
                        kyc_link: 'https://maplerad.com',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successful',
                    data: {
                      reference: '8cdb5a6c-e5c8-494a-b430-47c30ad4988e',
                      account_id: '301977d2-a013-41ad-abe3-809b667e1101',
                      status: 'APPROVED',
                      message: [
                        "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                      ],
                      currency: 'USD',
                      kyc_link: 'https://maplerad.com',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successful',
                  data: {
                    reference: '8cdb5a6c-e5c8-494a-b430-47c30ad4988e',
                    account_id: '301977d2-a013-41ad-abe3-809b667e1101',
                    status: 'APPROVED',
                    message: [
                      "The proof of address submitted does not include the customer's name. Please submit a proof of address with the customer's name, issued within the last 90 days.",
                    ],
                    currency: 'USD',
                    kyc_link: 'https://maplerad.com',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account/{id}': {
      get: {
        summary: 'Get Virtual Account by ID',
        description: 'This resource allows to retrieve an account by its ID.',
        operationId: 'getV1CollectionsVirtualAccountId',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                        },
                        bank_name: {
                          type: 'string',
                          example: 'Bank of the Lakes',
                        },
                        account_number: {
                          type: 'string',
                          example: '075205633070',
                        },
                        account_name: {
                          type: 'string',
                          example: 'Doe John',
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        created_at: {
                          type: 'string',
                          example: '2024-04-10T06:55:32.00662+01:00',
                        },
                        require_consent: {
                          type: 'boolean',
                          example: false,
                        },
                        consented: {
                          type: 'boolean',
                          example: false,
                        },
                        consent_url: {},
                        reference: {},
                        iban: {
                          type: 'array',
                          items: {
                            type: 'object',
                            properties: {
                              instruction_type: {
                                type: 'string',
                                example: 'ACH',
                              },
                              routing_number: {
                                type: 'string',
                                example: '021001208',
                              },
                              bank_name: {
                                type: 'string',
                                example: 'Bank of the Lakes',
                              },
                              account_type: {
                                type: 'string',
                                example: 'PERSONAL_CHECKING',
                              },
                              account_number: {
                                type: 'string',
                                example: '975205633350',
                              },
                              account_name: {
                                type: 'string',
                                example: 'Doe John',
                              },
                              memo: {
                                type: 'string',
                                example: 'RUJV3MB',
                              },
                              swift_code: {
                                type: 'string',
                                example: '',
                              },
                              account_holder_address: {
                                type: 'string',
                                example: '12 Victoria Island, Lagos, NG 204105',
                              },
                              institution_address: {
                                type: 'string',
                                example:
                                  ' 12 Victoria Island, Lagos, NG 204105',
                              },
                            },
                            example: {
                              instruction_type: 'ACH',
                              routing_number: '021001208',
                              bank_name: 'Bank of the Lakes',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '975205633350',
                              account_name: 'Doe John',
                              memo: 'RUJV3MB',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                ' 12 Victoria Island, Lagos, NG 204105',
                            },
                          },
                          example: [
                            {
                              instruction_type: 'ACH',
                              routing_number: '021001208',
                              bank_name: 'Bank of the Lakes',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '975205633350',
                              account_name: 'Doe John',
                              memo: 'RUJV3MB',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                ' 12 Victoria Island, Lagos, NG 204105',
                            },
                            {
                              instruction_type: 'FEDWIRE',
                              routing_number: '021001208',
                              bank_name: 'Maplerad Bank',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '075205633070',
                              account_name: 'Doe John',
                              memo: 'EMH2UT4',
                              swift_code: '',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                ' 12 Victoria Island, Lagos, NG 204105',
                            },
                            {
                              instruction_type: 'SWIFT',
                              routing_number: '',
                              bank_name: 'Bank of America',
                              account_type: 'PERSONAL_CHECKING',
                              account_number: '752075633021',
                              account_name: 'Doe John',
                              memo: 'JZXMCQB',
                              swift_code: 'LAKEUS41',
                              account_holder_address:
                                '12 Victoria Island, Lagos, NG 204105',
                              institution_address:
                                ' 12 Victoria Island, Lagos, NG 204105',
                            },
                          ],
                        },
                      },
                      example: {
                        id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                        bank_name: 'Bank of the Lakes',
                        account_number: '075205633070',
                        account_name: 'Doe John',
                        currency: 'USD',
                        created_at: '2024-04-10T06:55:32.00662+01:00',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: [
                          {
                            instruction_type: 'ACH',
                            routing_number: '021001208',
                            bank_name: 'Bank of the Lakes',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '975205633350',
                            account_name: 'Doe John',
                            memo: 'RUJV3MB',
                            swift_code: '',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              ' 12 Victoria Island, Lagos, NG 204105',
                          },
                          {
                            instruction_type: 'FEDWIRE',
                            routing_number: '021001208',
                            bank_name: 'Maplerad Bank',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '075205633070',
                            account_name: 'Doe John',
                            memo: 'EMH2UT4',
                            swift_code: '',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              ' 12 Victoria Island, Lagos, NG 204105',
                          },
                          {
                            instruction_type: 'SWIFT',
                            routing_number: '',
                            bank_name: 'Bank of America',
                            account_type: 'PERSONAL_CHECKING',
                            account_number: '752075633021',
                            account_name: 'Doe John',
                            memo: 'JZXMCQB',
                            swift_code: 'LAKEUS41',
                            account_holder_address:
                              '12 Victoria Island, Lagos, NG 204105',
                            institution_address:
                              ' 12 Victoria Island, Lagos, NG 204105',
                          },
                        ],
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successful',
                    data: {
                      id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                      bank_name: 'Bank of the Lakes',
                      account_number: '075205633070',
                      account_name: 'Doe John',
                      currency: 'USD',
                      created_at: '2024-04-10T06:55:32.00662+01:00',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: [
                        {
                          instruction_type: 'ACH',
                          routing_number: '021001208',
                          bank_name: 'Bank of the Lakes',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '975205633350',
                          account_name: 'Doe John',
                          memo: 'RUJV3MB',
                          swift_code: '',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            ' 12 Victoria Island, Lagos, NG 204105',
                        },
                        {
                          instruction_type: 'FEDWIRE',
                          routing_number: '021001208',
                          bank_name: 'Maplerad Bank',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '075205633070',
                          account_name: 'Doe John',
                          memo: 'EMH2UT4',
                          swift_code: '',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            ' 12 Victoria Island, Lagos, NG 204105',
                        },
                        {
                          instruction_type: 'SWIFT',
                          routing_number: '',
                          bank_name: 'Bank of America',
                          account_type: 'PERSONAL_CHECKING',
                          account_number: '752075633021',
                          account_name: 'Doe John',
                          memo: 'JZXMCQB',
                          swift_code: 'LAKEUS41',
                          account_holder_address:
                            '12 Victoria Island, Lagos, NG 204105',
                          institution_address:
                            ' 12 Victoria Island, Lagos, NG 204105',
                        },
                      ],
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successful',
                  data: {
                    id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                    bank_name: 'Bank of the Lakes',
                    account_number: '075205633070',
                    account_name: 'Doe John',
                    currency: 'USD',
                    created_at: '2024-04-10T06:55:32.00662+01:00',
                    require_consent: false,
                    consented: false,
                    consent_url: null,
                    reference: null,
                    iban: [
                      {
                        instruction_type: 'ACH',
                        routing_number: '021001208',
                        bank_name: 'Bank of the Lakes',
                        account_type: 'PERSONAL_CHECKING',
                        account_number: '975205633350',
                        account_name: 'Doe John',
                        memo: 'RUJV3MB',
                        swift_code: '',
                        account_holder_address:
                          '12 Victoria Island, Lagos, NG 204105',
                        institution_address:
                          ' 12 Victoria Island, Lagos, NG 204105',
                      },
                      {
                        instruction_type: 'FEDWIRE',
                        routing_number: '021001208',
                        bank_name: 'Maplerad Bank',
                        account_type: 'PERSONAL_CHECKING',
                        account_number: '075205633070',
                        account_name: 'Doe John',
                        memo: 'EMH2UT4',
                        swift_code: '',
                        account_holder_address:
                          '12 Victoria Island, Lagos, NG 204105',
                        institution_address:
                          ' 12 Victoria Island, Lagos, NG 204105',
                      },
                      {
                        instruction_type: 'SWIFT',
                        routing_number: '',
                        bank_name: 'Bank of America',
                        account_type: 'PERSONAL_CHECKING',
                        account_number: '752075633021',
                        account_name: 'Doe John',
                        memo: 'JZXMCQB',
                        swift_code: 'LAKEUS41',
                        account_holder_address:
                          '12 Victoria Island, Lagos, NG 204105',
                        institution_address:
                          ' 12 Victoria Island, Lagos, NG 204105',
                      },
                    ],
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account/{account_id}/rails': {
      get: {
        summary: 'Supported Rails',
        description: 'Get supported payment rails for account',
        operationId: 'getV1CollectionsVirtualAccountAccountIdRails',
        parameters: [
          {
            name: 'account_id',
            in: 'path',
            required: true,
            description: 'Virtual Account ID',
            schema: {
              type: 'string',
              description: 'Virtual Account ID',
              default: 'a7fb61a2-24eb-42e7-9ef2-50b8ff741fbd',
            },
            example: 'a7fb61a2-24eb-42e7-9ef2-50b8ff741fbd',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          rail: {
                            type: 'string',
                            example: 'ACH',
                          },
                          name: {
                            type: 'string',
                            example: 'ach',
                          },
                          estimated_duration: {
                            type: 'string',
                            example: '1-3 days',
                          },
                        },
                        example: {
                          rail: 'ACH',
                          name: 'ach',
                          estimated_duration: '1-3 days',
                        },
                      },
                      example: [
                        {
                          rail: 'ACH',
                          name: 'ach',
                          estimated_duration: '1-3 days',
                        },
                        {
                          rail: 'ACH-ACCELERATED',
                          name: 'ach accelerated',
                          estimated_duration: 'usually same day',
                        },
                        {
                          rail: 'FEDWIRE',
                          name: 'wire',
                          estimated_duration: '30-60 minutes',
                        },
                        {
                          rail: 'SEPA',
                          name: 'sepa',
                          estimated_duration:
                            'a few minutes if under 100k EUR; 1-2 days if over 100k EUR',
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully',
                    data: [
                      {
                        rail: 'ACH',
                        name: 'ach',
                        estimated_duration: '1-3 days',
                      },
                      {
                        rail: 'ACH-ACCELERATED',
                        name: 'ach accelerated',
                        estimated_duration: 'usually same day',
                      },
                      {
                        rail: 'FEDWIRE',
                        name: 'wire',
                        estimated_duration: '30-60 minutes',
                      },
                      {
                        rail: 'SEPA',
                        name: 'sepa',
                        estimated_duration:
                          'a few minutes if under 100k EUR; 1-2 days if over 100k EUR',
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'successfully',
                  data: [
                    {
                      rail: 'ACH',
                      name: 'ach',
                      estimated_duration: '1-3 days',
                    },
                    {
                      rail: 'ACH-ACCELERATED',
                      name: 'ach accelerated',
                      estimated_duration: 'usually same day',
                    },
                    {
                      rail: 'FEDWIRE',
                      name: 'wire',
                      estimated_duration: '30-60 minutes',
                    },
                    {
                      rail: 'SEPA',
                      name: 'sepa',
                      estimated_duration:
                        'a few minutes if under 100k EUR; 1-2 days if over 100k EUR',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/usd/kyc_link': {
      post: {
        summary: 'Create Account(USD) KYC Link',
        description:
          'This resource enables the request a KYC Link to get a USD account. A reference ID is returned which can be used to get the account request status.',
        operationId: 'postV1CollectionsUsdKycLink',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                  },
                  redirect_url: {
                    type: 'string',
                    description:
                      'The location to redirect the customer after completing the KYC flow. Must be in the form of http:// or https://.',
                  },
                },
                required: ['customer_id', 'redirect_url'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '',
          },
        },
      },
    },
    '/v1/collections/virtual-account/counterparties': {
      post: {
        summary: 'Create a Counterparty',
        description:
          'An account counterparty is a potential payment recipient from that account.',
        operationId: 'postV1CollectionsVirtualAccountCounterparties',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  account_id: {
                    type: 'string',
                    description:
                      'The virtual account ID this counterparty will be linked to.',
                  },
                  email: {
                    type: 'string',
                    description: "The individual's email address.",
                    default: 'johndoe@testmail.com',
                  },
                  description: {
                    type: 'string',
                    description: 'Describe what the payment is for.',
                    default: 'tuition',
                  },
                  beneficiary_address: {
                    type: 'object',
                    properties: {
                      unit_number: {
                        type: 'string',
                        default: '21',
                      },
                      street: {
                        type: 'string',
                        default: 'Adeniyi Jones',
                      },
                      city: {
                        type: 'string',
                        default: 'ikeja',
                      },
                      state: {
                        type: 'string',
                        default: 'lagos',
                      },
                      postal_code: {
                        type: 'string',
                        default: '210422',
                      },
                      country: {
                        type: 'string',
                        description: 'ISO code of country of residence',
                        default: 'NG',
                      },
                    },
                    required: [
                      'street',
                      'city',
                      'state',
                      'postal_code',
                      'country',
                    ],
                  },
                  account_information: {
                    type: 'object',
                    required: [
                      'account_name',
                      'account_number',
                      'type',
                      'payment_rails',
                      'routing_number',
                      'institution_name',
                    ],
                    properties: {
                      account_name: {
                        type: 'string',
                      },
                      account_number: {
                        type: 'string',
                      },
                      type: {
                        type: 'string',
                        description: 'The account type.',
                        default: 'SAVINGS',
                      },
                      payment_rails: {
                        type: 'array',
                        description: 'Supported payment rails are FEDWIRE, ACH',
                      },
                      routing_number: {
                        type: 'string',
                      },
                      swift_code: {
                        type: 'string',
                        description: 'The institution bank code.',
                        default: 'LAKEUS41',
                      },
                      institution_name: {
                        type: 'string',
                        description:
                          "The banking institution's name of the counterparty.",
                        default: 'Bank of the Lakes',
                      },
                      institution_address: {
                        type: 'object',
                        properties: {
                          unit_number: {
                            type: 'string',
                            default: '21',
                          },
                          street: {
                            type: 'string',
                            default: 'Adeniyi Jones',
                          },
                          city: {
                            type: 'string',
                            default: 'ikeja',
                          },
                          state: {
                            type: 'string',
                            default: 'lagos',
                          },
                          postal_code: {
                            type: 'string',
                            default: '210422',
                          },
                          country: {
                            type: 'string',
                            description: 'ISO code of country of residence',
                            default: 'NG',
                          },
                        },
                      },
                    },
                  },
                  phone_number: {
                    type: 'string',
                    description:
                      'The phone number of the counterparty in E.164 format +23480000000**',
                  },
                  is_corporate: {
                    type: 'boolean',
                    description:
                      'If counterparty account is a corporate account (belongs to a business) id `true` else if it belongs to an Individual `false`',
                    default: 'false',
                  },
                  business_name: {
                    type: 'string',
                    description:
                      'Business name of the corporate account. Required when `is_corporate` is true',
                  },
                  first_name: {
                    type: 'string',
                    description:
                      'First name of the individual account holder. Required when the `is_corporate` is false',
                  },
                  last_name: {
                    type: 'string',
                    description:
                      'Last name of the individual account holder. Required when the `is_corporate` is false',
                  },
                },
                required: [
                  'account_id',
                  'beneficiary_address',
                  'account_information',
                  'is_corporate',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '47342baa-9d9c-42fc-9112-56816198539b',
                        },
                        account_id: {
                          type: 'string',
                          example: '0aa13683-065b-4f26-8c66-cc4638f7462e',
                        },
                        InstitutionName: {
                          type: 'string',
                          example: 'Bank of the Lakes',
                        },
                        account_number: {
                          type: 'string',
                          example: '976116853580',
                        },
                        account_name: {
                          type: 'string',
                          example: 'John Doe',
                        },
                        payment_rail: {
                          type: 'array',
                          items: {
                            type: 'string',
                            example: 'SWIFT',
                          },
                          example: ['SWIFT'],
                        },
                        active: {
                          type: 'boolean',
                          example: false,
                        },
                      },
                      example: {
                        id: '47342baa-9d9c-42fc-9112-56816198539b',
                        account_id: '0aa13683-065b-4f26-8c66-cc4638f7462e',
                        InstitutionName: 'Bank of the Lakes',
                        account_number: '976116853580',
                        account_name: 'John Doe',
                        payment_rail: ['SWIFT'],
                        active: false,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully',
                    data: {
                      id: '47342baa-9d9c-42fc-9112-56816198539b',
                      account_id: '0aa13683-065b-4f26-8c66-cc4638f7462e',
                      InstitutionName: 'Bank of the Lakes',
                      account_number: '976116853580',
                      account_name: 'John Doe',
                      payment_rail: ['SWIFT'],
                      active: false,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successfully',
                  data: {
                    id: '47342baa-9d9c-42fc-9112-56816198539b',
                    account_id: '0aa13683-065b-4f26-8c66-cc4638f7462e',
                    InstitutionName: 'Bank of the Lakes',
                    account_number: '976116853580',
                    account_name: 'John Doe',
                    payment_rail: ['SWIFT'],
                    active: false,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account/counterparties/{counter_party_id}': {
      get: {
        summary: 'Get Counterparty By ID',
        description: '',
        operationId:
          'getV1CollectionsVirtualAccountCounterpartiesCounterPartyId',
        parameters: [
          {
            name: 'counter_party_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                          },
                          account_id: {
                            type: 'string',
                            example: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                          },
                          institution_name: {
                            type: 'string',
                            example: 'Bank of the Lakes',
                          },
                          description: {
                            type: 'string',
                            example: '',
                          },
                          payment_rails: {
                            type: 'array',
                            items: {
                              type: 'string',
                              example: 'FEDWIRE',
                            },
                            example: ['FEDWIRE', 'SWIFT'],
                          },
                          account_number: {
                            type: 'string',
                            example: '035222633089',
                          },
                          account_name: {
                            type: 'string',
                            example: 'John Doe',
                          },
                          account_type: {},
                          active: {
                            type: 'boolean',
                            example: true,
                          },
                        },
                        example: {
                          id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                          account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                          institution_name: 'Bank of the Lakes',
                          description: '',
                          payment_rails: ['FEDWIRE', 'SWIFT'],
                          account_number: '035222633089',
                          account_name: 'John Doe',
                          account_type: null,
                          active: true,
                        },
                      },
                      example: [
                        {
                          id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                          account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                          institution_name: 'Bank of the Lakes',
                          description: '',
                          payment_rails: ['FEDWIRE', 'SWIFT'],
                          account_number: '035222633089',
                          account_name: 'John Doe',
                          account_type: null,
                          active: true,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully',
                    data: [
                      {
                        id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                        account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                        institution_name: 'Bank of the Lakes',
                        description: '',
                        payment_rails: ['FEDWIRE', 'SWIFT'],
                        account_number: '035222633089',
                        account_name: 'John Doe',
                        account_type: null,
                        active: true,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'successfully',
                  data: [
                    {
                      id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                      account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                      institution_name: 'Bank of the Lakes',
                      description: '',
                      payment_rails: ['FEDWIRE', 'SWIFT'],
                      account_number: '035222633089',
                      account_name: 'John Doe',
                      account_type: null,
                      active: true,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/virtual-account/{id}/counterparties': {
      get: {
        summary: 'Get Counterparty By Account ID',
        description: '',
        operationId: 'getV1CollectionsVirtualAccountIdCounterparties',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                          },
                          account_id: {
                            type: 'string',
                            example: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                          },
                          institution_name: {
                            type: 'string',
                            example: 'Bank of the Lakes',
                          },
                          description: {
                            type: 'string',
                            example: '',
                          },
                          payment_rails: {
                            type: 'array',
                            items: {
                              type: 'string',
                              example: 'FEDWIRE',
                            },
                            example: ['FEDWIRE', 'SWIFT'],
                          },
                          account_number: {
                            type: 'string',
                            example: '035222633089',
                          },
                          account_name: {
                            type: 'string',
                            example: 'John Doe',
                          },
                          account_type: {},
                          active: {
                            type: 'boolean',
                            example: true,
                          },
                        },
                        example: {
                          id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                          account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                          institution_name: 'Bank of the Lakes',
                          description: '',
                          payment_rails: ['FEDWIRE', 'SWIFT'],
                          account_number: '035222633089',
                          account_name: 'John Doe',
                          account_type: null,
                          active: true,
                        },
                      },
                      example: [
                        {
                          id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                          account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                          institution_name: 'Bank of the Lakes',
                          description: '',
                          payment_rails: ['FEDWIRE', 'SWIFT'],
                          account_number: '035222633089',
                          account_name: 'John Doe',
                          account_type: null,
                          active: true,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully',
                    data: [
                      {
                        id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                        account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                        institution_name: 'Bank of the Lakes',
                        description: '',
                        payment_rails: ['FEDWIRE', 'SWIFT'],
                        account_number: '035222633089',
                        account_name: 'John Doe',
                        account_type: null,
                        active: true,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'successfully',
                  data: [
                    {
                      id: '00dd20b7-af8c-4b49-99b6-c99b90702b3a',
                      account_id: 'bbbfad4c-9c5e-475e-995f-138a3b98975b',
                      institution_name: 'Bank of the Lakes',
                      description: '',
                      payment_rails: ['FEDWIRE', 'SWIFT'],
                      account_number: '035222633089',
                      account_name: 'John Doe',
                      account_type: null,
                      active: true,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/collections/dynamic-account': {
      post: {
        summary: 'Dynamic (One-Time Use) Account',
        description:
          'The Dynamic Account is a temporary virtual account generated on demand to receive a single payment transaction.',
        operationId: 'postV1CollectionsDynamicAccount',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  account_name: {
                    type: 'string',
                    description:
                      'The account_name represents the name that will be associated with the generated dynamic (one-time use) account.',
                    default: 'Jane Doe',
                  },
                  amount: {
                    type: 'string',
                    description:
                      'The amount specifies the expected payment value for the generated dynamic (one-time use) account.',
                  },
                  preferred_bank: {
                    type: 'string',
                    description:
                      'The bank code of the bank you prefer. This can be gotten from [get institutions](https://maplerad.dev/reference/get-all-institutions) while setting type as DYNAMIC.\nThis name is typically displayed to the payer during the transfer process',
                    default: '1241',
                  },
                },
                required: ['account_name', 'preferred_bank'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '',
          },
          '201': {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '63b6f461-5cc6-4e8d-a70c-19be7f8cd401',
                        },
                        bank_name: {
                          type: 'string',
                          example: 'VFD Bank',
                        },
                        account_number: {
                          type: 'string',
                          example: '5010288665',
                        },
                        account_name: {
                          type: 'string',
                          example: 'Jane Doe',
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        created_at: {
                          type: 'string',
                          example: '2026-02-18T15:55:22.438529236Z',
                        },
                        require_consent: {
                          type: 'boolean',
                          example: false,
                        },
                        consented: {
                          type: 'boolean',
                          example: false,
                        },
                        consent_url: {},
                        reference: {},
                        iban: {},
                        eur: {},
                      },
                      example: {
                        id: '63b6f461-5cc6-4e8d-a70c-19be7f8cd401',
                        bank_name: 'VFD Bank',
                        account_number: '5010288665',
                        account_name: 'Jane Doe',
                        currency: 'NGN',
                        created_at: '2026-02-18T15:55:22.438529236Z',
                        require_consent: false,
                        consented: false,
                        consent_url: null,
                        reference: null,
                        iban: null,
                        eur: null,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successful',
                    data: {
                      id: '63b6f461-5cc6-4e8d-a70c-19be7f8cd401',
                      bank_name: 'VFD Bank',
                      account_number: '5010288665',
                      account_name: 'Jane Doe',
                      currency: 'NGN',
                      created_at: '2026-02-18T15:55:22.438529236Z',
                      require_consent: false,
                      consented: false,
                      consent_url: null,
                      reference: null,
                      iban: null,
                      eur: null,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successful',
                  data: {
                    id: '63b6f461-5cc6-4e8d-a70c-19be7f8cd401',
                    bank_name: 'VFD Bank',
                    account_number: '5010288665',
                    account_name: 'Jane Doe',
                    currency: 'NGN',
                    created_at: '2026-02-18T15:55:22.438529236Z',
                    require_consent: false,
                    consented: false,
                    consent_url: null,
                    reference: null,
                    iban: null,
                    eur: null,
                  },
                },
              },
            },
          },
        },
      },
    },
    '/v1/issuing': {
      post: {
        summary: 'Create a Card',
        description:
          'This resource allows you to create a card for a customer. This operation is asynchronous, meaning we notify you via a webhook event on the final status.',
        operationId: 'postV1Issuing',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  customer_id: {
                    type: 'string',
                    description: 'The ID of the customer.',
                    default: 'ac2bea42-058f-44d9-905d-48a92360129e',
                  },
                  currency: {
                    type: 'string',
                    description:
                      'The currency that will be stored in this card',
                  },
                  type: {
                    type: 'string',
                    description: 'The type of card.',
                    default: 'VIRTUAL',
                  },
                  auto_approve: {
                    type: 'boolean',
                    description: 'Must always be true.',
                    default: 'true',
                  },
                  brand: {
                    type: 'string',
                    description:
                      'The card brand to be issued, if not set "VISA" will be issued.',
                    default: 'VISA',
                  },
                  amount: {
                    type: 'integer',
                    description:
                      'The amount a card will be pre-funded with. The amount in the lowest denomination of the currency e.g cents for USD or kobo for NGN. This is available for VISA & MASTERCARD brand.',
                    default: '200',
                  },
                },
                required: ['customer_id', 'currency', 'type', 'auto_approve'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Card creation in progress',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        reference: {
                          type: 'string',
                          example: 'fe796aef-5dca-47d5-a542-16d403b464d1',
                        },
                      },
                      example: {
                        reference: 'fe796aef-5dca-47d5-a542-16d403b464d1',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Card creation in progress',
                    data: {
                      reference: 'fe796aef-5dca-47d5-a542-16d403b464d1',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Card creation in progress',
                  data: {
                    reference: 'fe796aef-5dca-47d5-a542-16d403b464d1',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
      get: {
        summary: 'Get all Cards',
        description: 'This resource returns all cards created.',
        operationId: 'getV1Issuing',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'For pagination',
            schema: {
              type: 'string',
              description: 'For pagination',
              default: '1',
            },
            example: '1',
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            description:
              'The total amount of cards that will be returned for this request.',
            schema: {
              type: 'string',
              description:
                'The total amount of cards that will be returned for this request.',
              default: '10',
            },
            example: '10',
          },
          {
            name: 'created_at',
            in: 'query',
            required: false,
            description: 'When the card was created.',
            schema: {
              type: 'string',
              description: 'When the card was created.',
              default: '2022-08-24',
            },
            example: '2022-08-24',
          },
          {
            name: 'brand',
            in: 'query',
            required: false,
            description: 'The card brand',
            schema: {
              type: 'string',
              description: 'The card brand',
              default: 'VISA',
            },
            example: 'VISA',
          },
          {
            name: 'status',
            in: 'query',
            required: false,
            description: 'The status of the card',
            schema: {
              type: 'string',
              description: 'The status of the card',
              default: 'ACTIVE',
            },
            example: 'ACTIVE',
          },
          {
            name: 'customer_id',
            in: 'query',
            required: false,
            description:
              'This is used to return all cards for a particular customer',
            schema: {
              type: 'string',
              description:
                'This is used to return all cards for a particular customer',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '6cff670c-da42-4fad-ba92-e422450caa77',
                          },
                          name: {
                            type: 'string',
                            example: 'Customer Test',
                          },
                          card_number: {},
                          masked_pan: {
                            type: 'string',
                            example: '484224******1052',
                          },
                          expiry: {},
                          cvv: {},
                          status: {
                            type: 'string',
                            example: 'ACTIVE',
                          },
                          type: {
                            type: 'string',
                            example: 'VIRTUAL',
                          },
                          issuer: {
                            type: 'string',
                            example: 'VISA',
                          },
                          currency: {
                            type: 'string',
                            example: 'USD',
                          },
                          balance: {
                            type: 'integer',
                            example: 0,
                          },
                          balance_updated_at: {
                            type: 'string',
                            example: '2023-02-27T23:53:16.356619Z',
                          },
                          auto_approve: {
                            type: 'boolean',
                            example: true,
                          },
                          address: {
                            type: 'object',
                            properties: {
                              street: {
                                type: 'string',
                                example: '256 Chapman Road STE 105-4',
                              },
                              city: {
                                type: 'string',
                                example: 'Newark',
                              },
                              state: {
                                type: 'string',
                                example: 'DE',
                              },
                              postal_code: {
                                type: 'string',
                                example: '19702',
                              },
                              country: {
                                type: 'string',
                                example: 'US',
                              },
                            },
                            example: {
                              street: '256 Chapman Road STE 105-4',
                              city: 'Newark',
                              state: 'DE',
                              postal_code: '19702',
                              country: 'US',
                            },
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-08-24T20:51:02.49362+01:00',
                          },
                          updated_at: {
                            type: 'string',
                            example: '2022-08-24T23:24:31.838465+01:00',
                          },
                        },
                        example: {
                          id: '6cff670c-da42-4fad-ba92-e422450caa77',
                          name: 'Customer Test',
                          card_number: null,
                          masked_pan: '484224******1052',
                          expiry: null,
                          cvv: null,
                          status: 'ACTIVE',
                          type: 'VIRTUAL',
                          issuer: 'VISA',
                          currency: 'USD',
                          balance: 0,
                          balance_updated_at: '2023-02-27T23:53:16.356619Z',
                          auto_approve: true,
                          address: {
                            street: '256 Chapman Road STE 105-4',
                            city: 'Newark',
                            state: 'DE',
                            postal_code: '19702',
                            country: 'US',
                          },
                          created_at: '2022-08-24T20:51:02.49362+01:00',
                          updated_at: '2022-08-24T23:24:31.838465+01:00',
                        },
                      },
                      example: [
                        {
                          id: '6cff670c-da42-4fad-ba92-e422450caa77',
                          name: 'Customer Test',
                          card_number: null,
                          masked_pan: '484224******1052',
                          expiry: null,
                          cvv: null,
                          status: 'ACTIVE',
                          type: 'VIRTUAL',
                          issuer: 'VISA',
                          currency: 'USD',
                          balance: 0,
                          balance_updated_at: '2023-02-27T23:53:16.356619Z',
                          auto_approve: true,
                          address: {
                            street: '256 Chapman Road STE 105-4',
                            city: 'Newark',
                            state: 'DE',
                            postal_code: '19702',
                            country: 'US',
                          },
                          created_at: '2022-08-24T20:51:02.49362+01:00',
                          updated_at: '2022-08-24T23:24:31.838465+01:00',
                        },
                        {
                          id: 'da24107d-a685-4b60-bc13-7dde10aee274',
                          name: 'Customer Test',
                          card_number: '4781009205497363',
                          masked_pan: '478100******7363',
                          expiry: null,
                          cvv: null,
                          status: 'ACTIVE',
                          type: 'VIRTUAL',
                          issuer: 'VISA',
                          currency: 'NGN',
                          balance: 0,
                          balance_updated_at: '2023-02-27T23:53:16.363121Z',
                          auto_approve: true,
                          address: {
                            street: '123 Main St',
                            city: 'San Francisco',
                            state: 'CA',
                            postal_code: '94105',
                            country: 'US',
                          },
                          created_at: '2022-08-24T16:30:43.846012+01:00',
                          updated_at: '2022-08-24T16:30:43.846012+01:00',
                        },
                      ],
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: {
                          type: 'integer',
                          example: 1,
                        },
                        page_size: {
                          type: 'integer',
                          example: 10,
                        },
                        total: {
                          type: 'integer',
                          example: 2,
                        },
                      },
                      example: {
                        page: 1,
                        page_size: 10,
                        total: 2,
                      },
                    },
                  },
                  example: {
                    data: [
                      {
                        id: '6cff670c-da42-4fad-ba92-e422450caa77',
                        name: 'Customer Test',
                        card_number: null,
                        masked_pan: '484224******1052',
                        expiry: null,
                        cvv: null,
                        status: 'ACTIVE',
                        type: 'VIRTUAL',
                        issuer: 'VISA',
                        currency: 'USD',
                        balance: 0,
                        balance_updated_at: '2023-02-27T23:53:16.356619Z',
                        auto_approve: true,
                        address: {
                          street: '256 Chapman Road STE 105-4',
                          city: 'Newark',
                          state: 'DE',
                          postal_code: '19702',
                          country: 'US',
                        },
                        created_at: '2022-08-24T20:51:02.49362+01:00',
                        updated_at: '2022-08-24T23:24:31.838465+01:00',
                      },
                      {
                        id: 'da24107d-a685-4b60-bc13-7dde10aee274',
                        name: 'Customer Test',
                        card_number: '4781009205497363',
                        masked_pan: '478100******7363',
                        expiry: null,
                        cvv: null,
                        status: 'ACTIVE',
                        type: 'VIRTUAL',
                        issuer: 'VISA',
                        currency: 'NGN',
                        balance: 0,
                        balance_updated_at: '2023-02-27T23:53:16.363121Z',
                        auto_approve: true,
                        address: {
                          street: '123 Main St',
                          city: 'San Francisco',
                          state: 'CA',
                          postal_code: '94105',
                          country: 'US',
                        },
                        created_at: '2022-08-24T16:30:43.846012+01:00',
                        updated_at: '2022-08-24T16:30:43.846012+01:00',
                      },
                    ],
                    meta: {
                      page: 1,
                      page_size: 10,
                      total: 2,
                    },
                  },
                },
                example: {
                  data: [
                    {
                      id: '6cff670c-da42-4fad-ba92-e422450caa77',
                      name: 'Customer Test',
                      card_number: null,
                      masked_pan: '484224******1052',
                      expiry: null,
                      cvv: null,
                      status: 'ACTIVE',
                      type: 'VIRTUAL',
                      issuer: 'VISA',
                      currency: 'USD',
                      balance: 0,
                      balance_updated_at: '2023-02-27T23:53:16.356619Z',
                      auto_approve: true,
                      address: {
                        street: '256 Chapman Road STE 105-4',
                        city: 'Newark',
                        state: 'DE',
                        postal_code: '19702',
                        country: 'US',
                      },
                      created_at: '2022-08-24T20:51:02.49362+01:00',
                      updated_at: '2022-08-24T23:24:31.838465+01:00',
                    },
                    {
                      id: 'da24107d-a685-4b60-bc13-7dde10aee274',
                      name: 'Customer Test',
                      card_number: '4781009205497363',
                      masked_pan: '478100******7363',
                      expiry: null,
                      cvv: null,
                      status: 'ACTIVE',
                      type: 'VIRTUAL',
                      issuer: 'VISA',
                      currency: 'NGN',
                      balance: 0,
                      balance_updated_at: '2023-02-27T23:53:16.363121Z',
                      auto_approve: true,
                      address: {
                        street: '123 Main St',
                        city: 'San Francisco',
                        state: 'CA',
                        postal_code: '94105',
                        country: 'US',
                      },
                      created_at: '2022-08-24T16:30:43.846012+01:00',
                      updated_at: '2022-08-24T16:30:43.846012+01:00',
                    },
                  ],
                  meta: {
                    page: 1,
                    page_size: 10,
                    total: 2,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/business': {
      post: {
        summary: 'Create a Business Card',
        description: 'This resource is used to create a card for a business.',
        operationId: 'postV1IssuingBusiness',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description:
                      "The business name, don't add special characters in the name.",
                    default: 'JANE DOE ENTERPRISES',
                  },
                  type: {
                    type: 'string',
                    description: 'The type of card.',
                    default: 'VIRTUAL',
                  },
                  brand: {
                    type: 'string',
                    description: 'The card brand to be issued.',
                    default: 'MASTERCARD',
                  },
                  amount: {
                    type: 'integer',
                    description:
                      'The amount a card will be pre-funded with. The amount in the lowest denomination of the currency e.g cents for USD or kobo for NGN. This is available and required for Business Card',
                    default: '300',
                  },
                  auto_approve: {
                    type: 'boolean',
                    description: 'Must always be true',
                  },
                  currency: {
                    type: 'string',
                    description:
                      'The currency that will be stored in this card',
                    default: 'USD',
                  },
                },
                required: ['name', 'type', 'brand', 'auto_approve', 'currency'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully created card',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '12598b0c-5bdc-413e-8e36-61d1945e5037',
                        },
                        name: {
                          type: 'string',
                          example: 'JANE DOE ENTERPRISES',
                        },
                        card_number: {
                          type: 'string',
                          example: '5561943433194127',
                        },
                        masked_pan: {
                          type: 'string',
                          example: '**** **** **** 4127',
                        },
                        expiry: {
                          type: 'string',
                          example: '3/26',
                        },
                        cvv: {
                          type: 'string',
                          example: '709',
                        },
                        status: {
                          type: 'string',
                          example: 'ACTIVE',
                        },
                        type: {
                          type: 'string',
                          example: 'VIRTUAL',
                        },
                        issuer: {
                          type: 'string',
                          example: 'MASTERCARD',
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        balance: {
                          type: 'integer',
                          example: 300,
                        },
                        balance_updated_at: {
                          type: 'string',
                          example: '2023-03-01T23:47:08.192623715Z',
                        },
                        auto_approve: {
                          type: 'boolean',
                          example: true,
                        },
                        address: {
                          type: 'object',
                          properties: {
                            street: {
                              type: 'string',
                              example: '333 Fremont Street',
                            },
                            city: {
                              type: 'string',
                              example: 'San Francisco',
                            },
                            state: {
                              type: 'string',
                              example: 'CA',
                            },
                            postal_code: {
                              type: 'string',
                              example: '94105',
                            },
                            country: {
                              type: 'string',
                              example: 'US',
                            },
                          },
                          example: {
                            street: '333 Fremont Street',
                            city: 'San Francisco',
                            state: 'CA',
                            postal_code: '94105',
                            country: 'US',
                          },
                        },
                        created_at: {
                          type: 'string',
                          example: '2023-03-01T23:46:39.795029Z',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2023-03-01T23:46:39.795029Z',
                        },
                      },
                      example: {
                        id: '12598b0c-5bdc-413e-8e36-61d1945e5037',
                        name: 'JANE DOE ENTERPRISES',
                        card_number: '5561943433194127',
                        masked_pan: '**** **** **** 4127',
                        expiry: '3/26',
                        cvv: '709',
                        status: 'ACTIVE',
                        type: 'VIRTUAL',
                        issuer: 'MASTERCARD',
                        currency: 'USD',
                        balance: 300,
                        balance_updated_at: '2023-03-01T23:47:08.192623715Z',
                        auto_approve: true,
                        address: {
                          street: '333 Fremont Street',
                          city: 'San Francisco',
                          state: 'CA',
                          postal_code: '94105',
                          country: 'US',
                        },
                        created_at: '2023-03-01T23:46:39.795029Z',
                        updated_at: '2023-03-01T23:46:39.795029Z',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully created card',
                    data: {
                      id: '12598b0c-5bdc-413e-8e36-61d1945e5037',
                      name: 'JANE DOE ENTERPRISES',
                      card_number: '5561943433194127',
                      masked_pan: '**** **** **** 4127',
                      expiry: '3/26',
                      cvv: '709',
                      status: 'ACTIVE',
                      type: 'VIRTUAL',
                      issuer: 'MASTERCARD',
                      currency: 'USD',
                      balance: 300,
                      balance_updated_at: '2023-03-01T23:47:08.192623715Z',
                      auto_approve: true,
                      address: {
                        street: '333 Fremont Street',
                        city: 'San Francisco',
                        state: 'CA',
                        postal_code: '94105',
                        country: 'US',
                      },
                      created_at: '2023-03-01T23:46:39.795029Z',
                      updated_at: '2023-03-01T23:46:39.795029Z',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully created card',
                  data: {
                    id: '12598b0c-5bdc-413e-8e36-61d1945e5037',
                    name: 'JANE DOE ENTERPRISES',
                    card_number: '5561943433194127',
                    masked_pan: '**** **** **** 4127',
                    expiry: '3/26',
                    cvv: '709',
                    status: 'ACTIVE',
                    type: 'VIRTUAL',
                    issuer: 'MASTERCARD',
                    currency: 'USD',
                    balance: 300,
                    balance_updated_at: '2023-03-01T23:47:08.192623715Z',
                    auto_approve: true,
                    address: {
                      street: '333 Fremont Street',
                      city: 'San Francisco',
                      state: 'CA',
                      postal_code: '94105',
                      country: 'US',
                    },
                    created_at: '2023-03-01T23:46:39.795029Z',
                    updated_at: '2023-03-01T23:46:39.795029Z',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}/fund': {
      post: {
        summary: 'Fund a Card',
        description:
          'This resource enables a customer to credit their card with a specified amount. The amount will be debited from your Maplerad balance.',
        operationId: 'postV1IssuingIdFund',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The card id',
            schema: {
              type: 'string',
              description: 'The card id',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'integer',
                    description:
                      "The amount in the lowest denomination of the card's currency; cents for USD, kobo for NGN. The amount that will be credited into the card. e.g $1 = 100",
                    default: '10000',
                  },
                },
                required: ['amount'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully credited card',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                        },
                      },
                      example: {
                        id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully credited card',
                    data: {
                      id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully credited card',
                  data: {
                    id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}/withdraw': {
      post: {
        summary: 'Withdraw from a Card',
        description:
          'This resource enables the debit of a card with a specified amount. The amount will be credited into your Maplerad balance',
        operationId: 'postV1IssuingIdWithdraw',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'the card id',
            schema: {
              type: 'string',
              description: 'the card id',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'integer',
                    description:
                      "The amount in the lowest denomination of the card's currency; cents for USD, kobo for NGN. The amount that will be debited from the card. e.g $1 = 100",
                  },
                },
                required: ['amount'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully debited card',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                        },
                      },
                      example: {
                        id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully debited card',
                    data: {
                      id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully debited card',
                  data: {
                    id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}': {
      get: {
        summary: 'Get a Card',
        description: 'This resource returns a card and its details',
        operationId: 'getV1IssuingId',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'the card id or reference',
            schema: {
              type: 'string',
              description: 'the card id or reference',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully fetched card',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                        },
                        name: {
                          type: 'string',
                          example: 'Customer Test',
                        },
                        card_number: {
                          type: 'string',
                          example: '4651896757142455',
                        },
                        masked_pan: {
                          type: 'string',
                          example: '465189******2455',
                        },
                        expiry: {
                          type: 'string',
                          example: '08/27',
                        },
                        cvv: {
                          type: 'string',
                          example: '123',
                        },
                        status: {
                          type: 'string',
                          example: 'ACTIVE',
                        },
                        type: {
                          type: 'string',
                          example: 'VIRTUAL',
                        },
                        issuer: {
                          type: 'string',
                          example: 'VISA',
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        balance: {
                          type: 'integer',
                          example: 0,
                        },
                        auto_approve: {
                          type: 'boolean',
                          example: true,
                        },
                        address: {
                          type: 'object',
                          properties: {
                            street: {
                              type: 'string',
                              example: '123 Main St',
                            },
                            city: {
                              type: 'string',
                              example: 'San Francisco',
                            },
                            state: {
                              type: 'string',
                              example: 'CA',
                            },
                            postal_code: {
                              type: 'string',
                              example: '94105',
                            },
                            country: {
                              type: 'string',
                              example: 'US',
                            },
                          },
                          example: {
                            street: '123 Main St',
                            city: 'San Francisco',
                            state: 'CA',
                            postal_code: '94105',
                            country: 'US',
                          },
                        },
                        created_at: {
                          type: 'string',
                          example: '2022-08-22T22:30:37.422929-05:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2022-08-22T22:30:37.422929-05:00',
                        },
                      },
                      example: {
                        id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                        name: 'Customer Test',
                        card_number: '4651896757142455',
                        masked_pan: '465189******2455',
                        expiry: '08/27',
                        cvv: '123',
                        status: 'ACTIVE',
                        type: 'VIRTUAL',
                        issuer: 'VISA',
                        currency: 'USD',
                        balance: 0,
                        auto_approve: true,
                        address: {
                          street: '123 Main St',
                          city: 'San Francisco',
                          state: 'CA',
                          postal_code: '94105',
                          country: 'US',
                        },
                        created_at: '2022-08-22T22:30:37.422929-05:00',
                        updated_at: '2022-08-22T22:30:37.422929-05:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully fetched card',
                    data: {
                      id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                      name: 'Customer Test',
                      card_number: '4651896757142455',
                      masked_pan: '465189******2455',
                      expiry: '08/27',
                      cvv: '123',
                      status: 'ACTIVE',
                      type: 'VIRTUAL',
                      issuer: 'VISA',
                      currency: 'USD',
                      balance: 0,
                      auto_approve: true,
                      address: {
                        street: '123 Main St',
                        city: 'San Francisco',
                        state: 'CA',
                        postal_code: '94105',
                        country: 'US',
                      },
                      created_at: '2022-08-22T22:30:37.422929-05:00',
                      updated_at: '2022-08-22T22:30:37.422929-05:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully fetched card',
                  data: {
                    id: '9f6dcea0-3ca5-41db-9d89-b66e971ed9b0',
                    name: 'Customer Test',
                    card_number: '4651896757142455',
                    masked_pan: '465189******2455',
                    expiry: '08/27',
                    cvv: '123',
                    status: 'ACTIVE',
                    type: 'VIRTUAL',
                    issuer: 'VISA',
                    currency: 'USD',
                    balance: 0,
                    auto_approve: true,
                    address: {
                      street: '123 Main St',
                      city: 'San Francisco',
                      state: 'CA',
                      postal_code: '94105',
                      country: 'US',
                    },
                    created_at: '2022-08-22T22:30:37.422929-05:00',
                    updated_at: '2022-08-22T22:30:37.422929-05:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}/transactions': {
      get: {
        summary: 'Get Card Transactions',
        description:
          'This resource allows you to retrieve all transactions made on a card.',
        operationId: 'getV1IssuingIdTransactions',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'card id',
            schema: {
              type: 'string',
              description: 'card id',
            },
          },
          {
            name: 'start_date',
            in: 'query',
            required: false,
            description:
              'Return transactions created after and on this date. YYYY-MM-DD',
            schema: {
              type: 'string',
              description:
                'Return transactions created after and on this date. YYYY-MM-DD',
              default: '2023-01-23',
            },
            example: '2023-01-23',
          },
          {
            name: 'end_date',
            in: 'query',
            required: false,
            description:
              'Return transactions created before and on this date. YYYY-MM-DD',
            schema: {
              type: 'string',
              description:
                'Return transactions created before and on this date. YYYY-MM-DD',
              default: '2023-01-27',
            },
            example: '2023-01-27',
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            description: 'Number of transactions to return per call',
            schema: {
              type: 'string',
              description: 'Number of transactions to return per call',
              default: '10',
            },
            example: '10',
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '1',
            },
            example: '1',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully fetched transactions',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '265bg3f2a4e267cc872579ced8c25b39',
                          },
                          amount: {
                            type: 'integer',
                            example: 4000,
                          },
                          currency: {
                            type: 'string',
                            example: 'USD',
                          },
                          description: {
                            type: 'string',
                            example: 'Card funding',
                          },
                          status: {
                            type: 'string',
                            example: 'SUCCESS',
                          },
                          entry: {
                            type: 'string',
                            example: 'CREDIT',
                          },
                          merchant: {
                            type: 'object',
                            properties: {
                              name: {
                                type: 'string',
                                example: 'Maplerad Technologies Inc.',
                              },
                              city: {
                                type: 'string',
                                example: 'Delaware',
                              },
                              country: {
                                type: 'string',
                                example: 'US',
                              },
                            },
                            example: {
                              name: 'Maplerad Technologies Inc.',
                              city: 'Delaware',
                              country: 'US',
                            },
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-08-28 18:45:16',
                          },
                        },
                        example: {
                          id: '265bg3f2a4e267cc872579ced8c25b39',
                          amount: 4000,
                          currency: 'USD',
                          description: 'Card funding',
                          status: 'SUCCESS',
                          entry: 'CREDIT',
                          merchant: {
                            name: 'Maplerad Technologies Inc.',
                            city: 'Delaware',
                            country: 'US',
                          },
                          created_at: '2022-08-28 18:45:16',
                        },
                      },
                      example: [
                        {
                          id: '265bg3f2a4e267cc872579ced8c25b39',
                          amount: 4000,
                          currency: 'USD',
                          description: 'Card funding',
                          status: 'SUCCESS',
                          entry: 'CREDIT',
                          merchant: {
                            name: 'Maplerad Technologies Inc.',
                            city: 'Delaware',
                            country: 'US',
                          },
                          created_at: '2022-08-28 18:45:16',
                        },
                        {
                          id: 'ce007fbc45304fedtra06fd9d9f5db86',
                          amount: 550,
                          currency: 'USD',
                          description: 'Card funding',
                          status: 'CREDIT',
                          merchant: {
                            name: 'Maplerad Technologies Inc.',
                            city: 'Delaware',
                            country: 'US',
                          },
                          created_at: '2022-08-27 22:14:39',
                        },
                        {
                          id: '13dcd1e6e1d62d4a9dc122983b457580',
                          amount: 6100,
                          currency: 'USD',
                          description: 'Card funding',
                          status: 'CREDIT',
                          merchant: {
                            name: 'Maplerad Technologies Inc.',
                            city: 'Delaware',
                            country: 'US',
                          },
                          created_at: '2022-08-27 22:10:55',
                        },
                      ],
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: {
                          type: 'integer',
                          example: 1,
                        },
                        page_size: {
                          type: 'integer',
                          example: 1,
                        },
                        total: {
                          type: 'integer',
                          example: 3,
                        },
                      },
                      example: {
                        page: 1,
                        page_size: 1,
                        total: 3,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully fetched transactions',
                    data: [
                      {
                        id: '265bg3f2a4e267cc872579ced8c25b39',
                        amount: 4000,
                        currency: 'USD',
                        description: 'Card funding',
                        status: 'SUCCESS',
                        entry: 'CREDIT',
                        merchant: {
                          name: 'Maplerad Technologies Inc.',
                          city: 'Delaware',
                          country: 'US',
                        },
                        created_at: '2022-08-28 18:45:16',
                      },
                      {
                        id: 'ce007fbc45304fedtra06fd9d9f5db86',
                        amount: 550,
                        currency: 'USD',
                        description: 'Card funding',
                        status: 'CREDIT',
                        merchant: {
                          name: 'Maplerad Technologies Inc.',
                          city: 'Delaware',
                          country: 'US',
                        },
                        created_at: '2022-08-27 22:14:39',
                      },
                      {
                        id: '13dcd1e6e1d62d4a9dc122983b457580',
                        amount: 6100,
                        currency: 'USD',
                        description: 'Card funding',
                        status: 'CREDIT',
                        merchant: {
                          name: 'Maplerad Technologies Inc.',
                          city: 'Delaware',
                          country: 'US',
                        },
                        created_at: '2022-08-27 22:10:55',
                      },
                    ],
                    meta: {
                      page: 1,
                      page_size: 1,
                      total: 3,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully fetched transactions',
                  data: [
                    {
                      id: '265bg3f2a4e267cc872579ced8c25b39',
                      amount: 4000,
                      currency: 'USD',
                      description: 'Card funding',
                      status: 'SUCCESS',
                      entry: 'CREDIT',
                      merchant: {
                        name: 'Maplerad Technologies Inc.',
                        city: 'Delaware',
                        country: 'US',
                      },
                      created_at: '2022-08-28 18:45:16',
                    },
                    {
                      id: 'ce007fbc45304fedtra06fd9d9f5db86',
                      amount: 550,
                      currency: 'USD',
                      description: 'Card funding',
                      status: 'CREDIT',
                      merchant: {
                        name: 'Maplerad Technologies Inc.',
                        city: 'Delaware',
                        country: 'US',
                      },
                      created_at: '2022-08-27 22:14:39',
                    },
                    {
                      id: '13dcd1e6e1d62d4a9dc122983b457580',
                      amount: 6100,
                      currency: 'USD',
                      description: 'Card funding',
                      status: 'CREDIT',
                      merchant: {
                        name: 'Maplerad Technologies Inc.',
                        city: 'Delaware',
                        country: 'US',
                      },
                      created_at: '2022-08-27 22:10:55',
                    },
                  ],
                  meta: {
                    page: 1,
                    page_size: 1,
                    total: 3,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}/freeze': {
      patch: {
        summary: 'Freeze a Card',
        description:
          'This resource allows a card created on Maplerad to be frozen. When a card is frozen no transaction (funding/withdrawal) will be allowed.',
        operationId: 'patchV1IssuingIdFreeze',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'card id',
            schema: {
              type: 'string',
              description: 'card id',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully disabled card',
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully disabled card',
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully disabled card',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}/terminate': {
      put: {
        summary: 'Terminate Card',
        description:
          'This resource allows a card created on Maplerad to be frozen. When a card is frozen no transaction (funding/withdrawal) will be allowed.',
        operationId: 'putV1IssuingIdTerminate',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'card id',
            schema: {
              type: 'string',
              description: 'card id',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Termination Successful',
                    },
                  },
                  example: {
                    status: true,
                    message: 'Termination Successful',
                  },
                },
                example: {
                  status: true,
                  message: 'Termination Successful',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/{id}/unfreeze': {
      patch: {
        summary: 'Unfreeze a Card',
        description:
          'This resource allows for the enabling of a previously frozen card created on Maplerad. When a card is enabled all transactions (funding/withdrawal) will be allowed.',
        operationId: 'patchV1IssuingIdUnfreeze',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'card id',
            schema: {
              type: 'string',
              description: 'card id',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully enabled card',
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully enabled card',
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully enabled card',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/issuing/charges': {
      get: {
        summary: 'Card Decline Charges',
        description: 'This endpoint retrieves a list of card-declined charges.',
        operationId: 'getV1IssuingCharges',
        parameters: [
          {
            name: 'channel',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
            },
          },
          {
            name: 'transaction_id',
            in: 'query',
            required: false,
            description: 'Card Charge by Transaction ID',
            schema: {
              type: 'string',
              description: 'Card Charge by Transaction ID',
            },
          },
          {
            name: 'start_date',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: 'YYYY-MM-DD',
            },
            example: 'YYYY-MM-DD',
          },
          {
            name: 'end_date',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: 'YYYY-MM-DD',
            },
            example: 'YYYY-MM-DD',
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: '1',
            },
            example: 1,
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: '10',
            },
            example: 10,
          },
          {
            name: 'search',
            in: 'query',
            required: false,
            description: 'Get Card Charge by debit reference',
            schema: {
              type: 'string',
              description: 'Get Card Charge by debit reference',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successful',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          created_at: {
                            type: 'string',
                            example: '2024-10-11T23:14:35.885+01:00',
                          },
                          card_id: {
                            type: 'string',
                            example: '54ced7ea-8049-441b-af84-2b06d349a655',
                          },
                          reason: {
                            type: 'string',
                            example:
                              'Fee for declined transaction | No sufficient funds | (12419738)',
                          },
                          card_transaction_id: {
                            type: 'string',
                            example: '674197384',
                          },
                          fee: {
                            type: 'integer',
                            example: 30,
                          },
                          channel: {
                            type: 'string',
                            example: 'CARD',
                          },
                        },
                        example: {
                          created_at: '2024-10-11T23:14:35.885+01:00',
                          card_id: '54ced7ea-8049-441b-af84-2b06d349a655',
                          reason:
                            'Fee for declined transaction | No sufficient funds | (12419738)',
                          card_transaction_id: '674197384',
                          fee: 30,
                          channel: 'CARD',
                        },
                      },
                      example: [
                        {
                          created_at: '2024-10-11T23:14:35.885+01:00',
                          card_id: '54ced7ea-8049-441b-af84-2b06d349a655',
                          reason:
                            'Fee for declined transaction | No sufficient funds | (12419738)',
                          card_transaction_id: '674197384',
                          fee: 30,
                          channel: 'CARD',
                        },
                        {
                          created_at: '2024-10-15T10:40:18.167036+01:00',
                          card_id: 'd24b8197-f11a-40e1-980d-434b5c2fadef',
                          reason: 'Decline Fee  13564790',
                          card_transaction_id: '13564790',
                          fee: 30,
                          channel: 'CARD',
                        },
                        {
                          created_at: '2024-10-15T10:41:12.643657+01:00',
                          card_id: 'd24b8197-f11a-40e1-980d-434b5c2fadef',
                          reason: 'Decline Fee  135647190',
                          card_transaction_id: '135647190',
                          fee: 30,
                          channel: 'CARD',
                        },
                      ],
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: {
                          type: 'integer',
                          example: 1,
                        },
                        page_size: {
                          type: 'integer',
                          example: 10,
                        },
                        total: {
                          type: 'integer',
                          example: 3,
                        },
                      },
                      example: {
                        page: 1,
                        page_size: 10,
                        total: 3,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successful',
                    data: [
                      {
                        created_at: '2024-10-11T23:14:35.885+01:00',
                        card_id: '54ced7ea-8049-441b-af84-2b06d349a655',
                        reason:
                          'Fee for declined transaction | No sufficient funds | (12419738)',
                        card_transaction_id: '674197384',
                        fee: 30,
                        channel: 'CARD',
                      },
                      {
                        created_at: '2024-10-15T10:40:18.167036+01:00',
                        card_id: 'd24b8197-f11a-40e1-980d-434b5c2fadef',
                        reason: 'Decline Fee  13564790',
                        card_transaction_id: '13564790',
                        fee: 30,
                        channel: 'CARD',
                      },
                      {
                        created_at: '2024-10-15T10:41:12.643657+01:00',
                        card_id: 'd24b8197-f11a-40e1-980d-434b5c2fadef',
                        reason: 'Decline Fee  135647190',
                        card_transaction_id: '135647190',
                        fee: 30,
                        channel: 'CARD',
                      },
                    ],
                    meta: {
                      page: 1,
                      page_size: 10,
                      total: 3,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successful',
                  data: [
                    {
                      created_at: '2024-10-11T23:14:35.885+01:00',
                      card_id: '54ced7ea-8049-441b-af84-2b06d349a655',
                      reason:
                        'Fee for declined transaction | No sufficient funds | (12419738)',
                      card_transaction_id: '674197384',
                      fee: 30,
                      channel: 'CARD',
                    },
                    {
                      created_at: '2024-10-15T10:40:18.167036+01:00',
                      card_id: 'd24b8197-f11a-40e1-980d-434b5c2fadef',
                      reason: 'Decline Fee  13564790',
                      card_transaction_id: '13564790',
                      fee: 30,
                      channel: 'CARD',
                    },
                    {
                      created_at: '2024-10-15T10:41:12.643657+01:00',
                      card_id: 'd24b8197-f11a-40e1-980d-434b5c2fadef',
                      reason: 'Decline Fee  135647190',
                      card_transaction_id: '135647190',
                      fee: 30,
                      channel: 'CARD',
                    },
                  ],
                  meta: {
                    page: 1,
                    page_size: 10,
                    total: 3,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/airtime/billers/{country}': {
      get: {
        summary: 'Get Billers',
        description:
          'This resource retrieves the available billers for a particular country',
        operationId: 'getV1BillsAirtimeBillersCountry',
        parameters: [
          {
            name: 'country',
            in: 'path',
            required: true,
            description: 'The country code e.g GH for Ghana, NG for Nigeria',
            schema: {
              type: 'string',
              description: 'The country code e.g GH for Ghana, NG for Nigeria',
              default: 'NG',
            },
            example: 'NG',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Airtime billers fetched successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'Airtime NG',
                          },
                          identifier: {
                            type: 'string',
                            example: 'ng-airtime',
                          },
                          commission: {
                            type: 'integer',
                            example: 1,
                          },
                        },
                        example: {
                          name: 'Airtime NG',
                          identifier: 'ng-airtime',
                          commission: 1,
                        },
                      },
                      example: [
                        {
                          name: 'Airtime NG',
                          identifier: 'ng-airtime',
                          commission: 1,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Airtime billers fetched successfully',
                    data: [
                      {
                        name: 'Airtime NG',
                        identifier: 'ng-airtime',
                        commission: 1,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Airtime billers fetched successfully',
                  data: [
                    {
                      name: 'Airtime NG',
                      identifier: 'ng-airtime',
                      commission: 1,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/{type}/billers/{country}': {
      get: {
        summary: 'Get Billers By Type and Country',
        description: '',
        operationId: 'getV1BillsTypeBillersCountry',
        parameters: [
          {
            name: 'type',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'data',
            },
            example: 'data',
          },
          {
            name: 'country',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'NG',
            },
            example: 'NG',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Data billers fetched successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'Smile',
                          },
                          identifier: {
                            type: 'string',
                            example: 'smile-data-ng',
                          },
                          commission: {
                            type: 'integer',
                            example: 1,
                          },
                        },
                        example: {
                          name: 'Smile',
                          identifier: 'smile-data-ng',
                          commission: 1,
                        },
                      },
                      example: [
                        {
                          name: 'Smile',
                          identifier: 'smile-data-ng',
                          commission: 1,
                        },
                        {
                          name: 'Spectranet',
                          identifier: 'spectranet-data-ng',
                          commission: 1,
                        },
                        {
                          name: 'MTN',
                          identifier: 'mtn-data-ng',
                          commission: 1,
                        },
                        {
                          name: 'GLO',
                          identifier: 'glo-data-ng',
                          commission: 1,
                        },
                        {
                          name: 'Airtel',
                          identifier: 'airtel-data-ng',
                          commission: 1,
                        },
                        {
                          name: '9mobile',
                          identifier: '9mobile-data-ng',
                          commission: 1,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Data billers fetched successfully',
                    data: [
                      {
                        name: 'Smile',
                        identifier: 'smile-data-ng',
                        commission: 1,
                      },
                      {
                        name: 'Spectranet',
                        identifier: 'spectranet-data-ng',
                        commission: 1,
                      },
                      {
                        name: 'MTN',
                        identifier: 'mtn-data-ng',
                        commission: 1,
                      },
                      {
                        name: 'GLO',
                        identifier: 'glo-data-ng',
                        commission: 1,
                      },
                      {
                        name: 'Airtel',
                        identifier: 'airtel-data-ng',
                        commission: 1,
                      },
                      {
                        name: '9mobile',
                        identifier: '9mobile-data-ng',
                        commission: 1,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Data billers fetched successfully',
                  data: [
                    {
                      name: 'Smile',
                      identifier: 'smile-data-ng',
                      commission: 1,
                    },
                    {
                      name: 'Spectranet',
                      identifier: 'spectranet-data-ng',
                      commission: 1,
                    },
                    {
                      name: 'MTN',
                      identifier: 'mtn-data-ng',
                      commission: 1,
                    },
                    {
                      name: 'GLO',
                      identifier: 'glo-data-ng',
                      commission: 1,
                    },
                    {
                      name: 'Airtel',
                      identifier: 'airtel-data-ng',
                      commission: 1,
                    },
                    {
                      name: '9mobile',
                      identifier: '9mobile-data-ng',
                      commission: 1,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/{bill_type}/bundle/{biller}': {
      get: {
        summary: 'Get Available Bundles',
        description: '',
        operationId: 'getV1BillsBillTypeBundleBiller',
        parameters: [
          {
            name: 'bill_type',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'data',
            },
            example: 'data',
          },
          {
            name: 'biller',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'mtn-data-ng',
            },
            example: 'mtn-data-ng',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Data bundle fetched successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: '100MB Daily for Daily - Daily',
                          },
                          price: {
                            type: 'integer',
                            example: 10000,
                          },
                          code: {
                            type: 'string',
                            example: '100_9',
                          },
                          validity: {
                            type: 'string',
                            example: 'Daily',
                          },
                          data: {
                            type: 'string',
                            example: '100MB Daily for Daily',
                          },
                        },
                        example: {
                          name: '100MB Daily for Daily - Daily',
                          price: 10000,
                          code: '100_9',
                          validity: 'Daily',
                          data: '100MB Daily for Daily',
                        },
                      },
                      example: [
                        {
                          name: '100MB Daily for Daily - Daily',
                          price: 10000,
                          code: '100_9',
                          validity: 'Daily',
                          data: '100MB Daily for Daily',
                        },
                        {
                          name: '200MB 3Day Plan for Daily - Daily',
                          price: 20000,
                          code: '200_9',
                          validity: 'Daily',
                          data: '200MB 3Day Plan for Daily',
                        },
                        {
                          name: '350MB for Weekly -  Weekly ',
                          price: 30000,
                          code: '300_9',
                          validity: 'Weekly',
                          data: '350MB for Weekly',
                        },
                        {
                          name: '750MB 2Week Plan for Weekly -  Weekly ',
                          price: 50000,
                          code: '500_9',
                          validity: 'Weekly',
                          data: '750MB 2Week Plan for Weekly',
                        },
                        {
                          name: '1.5GB for Monthly - Monthly',
                          price: 100000,
                          code: '1000_9',
                          validity: 'Monthly',
                          data: '1.5GB for Monthly',
                        },
                        {
                          name: '2GB for Monthly - Monthly',
                          price: 120000,
                          code: '1200_9',
                          validity: 'Monthly',
                          data: '2GB for Monthly',
                        },
                        {
                          name: '3GB for Monthly - Monthly',
                          price: 150000,
                          code: '1500_36',
                          validity: 'Monthly',
                          data: '3GB for Monthly',
                        },
                        {
                          name: '6GB for Monthly - Monthly',
                          price: 250000,
                          code: '2500_9',
                          validity: 'Monthly',
                          data: '6GB for Monthly',
                        },
                        {
                          name: '10GB for Monthly - Monthly',
                          price: 300000,
                          code: '3000_9',
                          validity: 'Monthly',
                          data: '10GB for Monthly',
                        },
                        {
                          name: '12GB for Monthly - Monthly',
                          price: 350000,
                          code: '3500_9',
                          validity: 'Monthly',
                          data: '12GB for Monthly',
                        },
                        {
                          name: '20GB for Monthly - Monthly',
                          price: 500000,
                          code: '5000_9',
                          validity: 'Monthly',
                          data: '20GB for Monthly',
                        },
                        {
                          name: '25GB for Monthly - Monthly',
                          price: 600000,
                          code: '6000_36',
                          validity: 'Monthly',
                          data: '25GB for Monthly',
                        },
                        {
                          name: '40GB for Monthly - Monthly',
                          price: 1000000,
                          code: '10000_9',
                          validity: 'Monthly',
                          data: '40GB for Monthly',
                        },
                        {
                          name: '75GB for Monthly - Monthly',
                          price: 1500000,
                          code: '15000_9',
                          validity: 'Monthly',
                          data: '75GB for Monthly',
                        },
                        {
                          name: '110GB for Monthly - Monthly',
                          price: 2000000,
                          code: '20000_36',
                          validity: 'Monthly',
                          data: '110GB for Monthly',
                        },
                        {
                          name: '120GB for 60Days - 60Days',
                          price: 3000000,
                          code: '30000_9',
                          validity: '60Days',
                          data: '120GB for 60Days',
                        },
                        {
                          name: '150GB for 90Days - 90Days',
                          price: 5000000,
                          code: '50000_9',
                          validity: '90Days',
                          data: '150GB for 90Days',
                        },
                        {
                          name: '120GB for 180Days - 180Days',
                          price: 10000000,
                          code: '100000_9',
                          validity: '180Days',
                          data: '120GB for 180Days',
                        },
                        {
                          name: '400GB for 1Year - 1Year',
                          price: 12000000,
                          code: '120000_9',
                          validity: '1Year',
                          data: '400GB for 1Year',
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Data bundle fetched successfully',
                    data: [
                      {
                        name: '100MB Daily for Daily - Daily',
                        price: 10000,
                        code: '100_9',
                        validity: 'Daily',
                        data: '100MB Daily for Daily',
                      },
                      {
                        name: '200MB 3Day Plan for Daily - Daily',
                        price: 20000,
                        code: '200_9',
                        validity: 'Daily',
                        data: '200MB 3Day Plan for Daily',
                      },
                      {
                        name: '350MB for Weekly -  Weekly ',
                        price: 30000,
                        code: '300_9',
                        validity: 'Weekly',
                        data: '350MB for Weekly',
                      },
                      {
                        name: '750MB 2Week Plan for Weekly -  Weekly ',
                        price: 50000,
                        code: '500_9',
                        validity: 'Weekly',
                        data: '750MB 2Week Plan for Weekly',
                      },
                      {
                        name: '1.5GB for Monthly - Monthly',
                        price: 100000,
                        code: '1000_9',
                        validity: 'Monthly',
                        data: '1.5GB for Monthly',
                      },
                      {
                        name: '2GB for Monthly - Monthly',
                        price: 120000,
                        code: '1200_9',
                        validity: 'Monthly',
                        data: '2GB for Monthly',
                      },
                      {
                        name: '3GB for Monthly - Monthly',
                        price: 150000,
                        code: '1500_36',
                        validity: 'Monthly',
                        data: '3GB for Monthly',
                      },
                      {
                        name: '6GB for Monthly - Monthly',
                        price: 250000,
                        code: '2500_9',
                        validity: 'Monthly',
                        data: '6GB for Monthly',
                      },
                      {
                        name: '10GB for Monthly - Monthly',
                        price: 300000,
                        code: '3000_9',
                        validity: 'Monthly',
                        data: '10GB for Monthly',
                      },
                      {
                        name: '12GB for Monthly - Monthly',
                        price: 350000,
                        code: '3500_9',
                        validity: 'Monthly',
                        data: '12GB for Monthly',
                      },
                      {
                        name: '20GB for Monthly - Monthly',
                        price: 500000,
                        code: '5000_9',
                        validity: 'Monthly',
                        data: '20GB for Monthly',
                      },
                      {
                        name: '25GB for Monthly - Monthly',
                        price: 600000,
                        code: '6000_36',
                        validity: 'Monthly',
                        data: '25GB for Monthly',
                      },
                      {
                        name: '40GB for Monthly - Monthly',
                        price: 1000000,
                        code: '10000_9',
                        validity: 'Monthly',
                        data: '40GB for Monthly',
                      },
                      {
                        name: '75GB for Monthly - Monthly',
                        price: 1500000,
                        code: '15000_9',
                        validity: 'Monthly',
                        data: '75GB for Monthly',
                      },
                      {
                        name: '110GB for Monthly - Monthly',
                        price: 2000000,
                        code: '20000_36',
                        validity: 'Monthly',
                        data: '110GB for Monthly',
                      },
                      {
                        name: '120GB for 60Days - 60Days',
                        price: 3000000,
                        code: '30000_9',
                        validity: '60Days',
                        data: '120GB for 60Days',
                      },
                      {
                        name: '150GB for 90Days - 90Days',
                        price: 5000000,
                        code: '50000_9',
                        validity: '90Days',
                        data: '150GB for 90Days',
                      },
                      {
                        name: '120GB for 180Days - 180Days',
                        price: 10000000,
                        code: '100000_9',
                        validity: '180Days',
                        data: '120GB for 180Days',
                      },
                      {
                        name: '400GB for 1Year - 1Year',
                        price: 12000000,
                        code: '120000_9',
                        validity: '1Year',
                        data: '400GB for 1Year',
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Data bundle fetched successfully',
                  data: [
                    {
                      name: '100MB Daily for Daily - Daily',
                      price: 10000,
                      code: '100_9',
                      validity: 'Daily',
                      data: '100MB Daily for Daily',
                    },
                    {
                      name: '200MB 3Day Plan for Daily - Daily',
                      price: 20000,
                      code: '200_9',
                      validity: 'Daily',
                      data: '200MB 3Day Plan for Daily',
                    },
                    {
                      name: '350MB for Weekly -  Weekly ',
                      price: 30000,
                      code: '300_9',
                      validity: 'Weekly',
                      data: '350MB for Weekly',
                    },
                    {
                      name: '750MB 2Week Plan for Weekly -  Weekly ',
                      price: 50000,
                      code: '500_9',
                      validity: 'Weekly',
                      data: '750MB 2Week Plan for Weekly',
                    },
                    {
                      name: '1.5GB for Monthly - Monthly',
                      price: 100000,
                      code: '1000_9',
                      validity: 'Monthly',
                      data: '1.5GB for Monthly',
                    },
                    {
                      name: '2GB for Monthly - Monthly',
                      price: 120000,
                      code: '1200_9',
                      validity: 'Monthly',
                      data: '2GB for Monthly',
                    },
                    {
                      name: '3GB for Monthly - Monthly',
                      price: 150000,
                      code: '1500_36',
                      validity: 'Monthly',
                      data: '3GB for Monthly',
                    },
                    {
                      name: '6GB for Monthly - Monthly',
                      price: 250000,
                      code: '2500_9',
                      validity: 'Monthly',
                      data: '6GB for Monthly',
                    },
                    {
                      name: '10GB for Monthly - Monthly',
                      price: 300000,
                      code: '3000_9',
                      validity: 'Monthly',
                      data: '10GB for Monthly',
                    },
                    {
                      name: '12GB for Monthly - Monthly',
                      price: 350000,
                      code: '3500_9',
                      validity: 'Monthly',
                      data: '12GB for Monthly',
                    },
                    {
                      name: '20GB for Monthly - Monthly',
                      price: 500000,
                      code: '5000_9',
                      validity: 'Monthly',
                      data: '20GB for Monthly',
                    },
                    {
                      name: '25GB for Monthly - Monthly',
                      price: 600000,
                      code: '6000_36',
                      validity: 'Monthly',
                      data: '25GB for Monthly',
                    },
                    {
                      name: '40GB for Monthly - Monthly',
                      price: 1000000,
                      code: '10000_9',
                      validity: 'Monthly',
                      data: '40GB for Monthly',
                    },
                    {
                      name: '75GB for Monthly - Monthly',
                      price: 1500000,
                      code: '15000_9',
                      validity: 'Monthly',
                      data: '75GB for Monthly',
                    },
                    {
                      name: '110GB for Monthly - Monthly',
                      price: 2000000,
                      code: '20000_36',
                      validity: 'Monthly',
                      data: '110GB for Monthly',
                    },
                    {
                      name: '120GB for 60Days - 60Days',
                      price: 3000000,
                      code: '30000_9',
                      validity: '60Days',
                      data: '120GB for 60Days',
                    },
                    {
                      name: '150GB for 90Days - 90Days',
                      price: 5000000,
                      code: '50000_9',
                      validity: '90Days',
                      data: '150GB for 90Days',
                    },
                    {
                      name: '120GB for 180Days - 180Days',
                      price: 10000000,
                      code: '100000_9',
                      validity: '180Days',
                      data: '120GB for 180Days',
                    },
                    {
                      name: '400GB for 1Year - 1Year',
                      price: 12000000,
                      code: '120000_9',
                      validity: '1Year',
                      data: '400GB for 1Year',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/airtime': {
      post: {
        summary: 'Buy Airtime',
        description: 'This resource enables the purchase of airtime',
        operationId: 'postV1BillsAirtime',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  phone_number: {
                    type: 'string',
                    description: 'The phone number to be credited',
                    default: '+2348217920035',
                  },
                  identifier: {
                    type: 'string',
                    description: 'This connotes the bill category',
                    default: 'ng-airtime',
                  },
                  amount: {
                    type: 'integer',
                    description:
                      'The value of the purchase. The amount in the lowest denomination of the currency e.g kobo for NGN so 10000 is 100NGN',
                    default: '1000',
                  },
                },
                required: ['phone_number', 'identifier', 'amount'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: '201',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Airtime purchased successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'f700000b-fb7d-4495-8842-54ccdbd2be13',
                        },
                        amount: {
                          type: 'integer',
                          example: 1000,
                        },
                        phone_number: {
                          type: 'string',
                          example: '+2348217920035',
                        },
                        network: {
                          type: 'string',
                          example: 'MTN',
                        },
                        debit_amount: {
                          type: 'integer',
                          example: 990,
                        },
                        commission_earned: {
                          type: 'integer',
                          example: 10,
                        },
                      },
                      example: {
                        id: 'f700000b-fb7d-4495-8842-54ccdbd2be13',
                        amount: 1000,
                        phone_number: '+2348217920035',
                        network: 'MTN',
                        debit_amount: 990,
                        commission_earned: 10,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Airtime purchased successfully',
                    data: {
                      id: 'f700000b-fb7d-4495-8842-54ccdbd2be13',
                      amount: 1000,
                      phone_number: '+2348217920035',
                      network: 'MTN',
                      debit_amount: 990,
                      commission_earned: 10,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Airtime purchased successfully',
                  data: {
                    id: 'f700000b-fb7d-4495-8842-54ccdbd2be13',
                    amount: 1000,
                    phone_number: '+2348217920035',
                    network: 'MTN',
                    debit_amount: 990,
                    commission_earned: 10,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
      get: {
        summary: 'Get Airtime History',
        description: 'This resource retrieves all airtime purchase history',
        operationId: 'getV1BillsAirtime',
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Fetched purchase history',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                          },
                          amount: {
                            type: 'integer',
                            example: 20000,
                          },
                          phone_number: {
                            type: 'string',
                            example: '+2348068120887',
                          },
                          network: {
                            type: 'string',
                            example: 'mtn',
                          },
                          debit_amount: {
                            type: 'integer',
                            example: 19800,
                          },
                          commission_earned: {
                            type: 'integer',
                            example: 200,
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-05-14T00:00:42.482809-05:00',
                          },
                        },
                        example: {
                          id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                          amount: 20000,
                          phone_number: '+2348068120887',
                          network: 'mtn',
                          debit_amount: 19800,
                          commission_earned: 200,
                          created_at: '2022-05-14T00:00:42.482809-05:00',
                        },
                      },
                      example: [
                        {
                          id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                          amount: 20000,
                          phone_number: '+2348068120887',
                          network: 'mtn',
                          debit_amount: 19800,
                          commission_earned: 200,
                          created_at: '2022-05-14T00:00:42.482809-05:00',
                        },
                        {
                          id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                          amount: 20000,
                          phone_number: '+2348068120887',
                          network: 'mtn',
                          debit_amount: 19800,
                          commission_earned: 200,
                          created_at: '2022-05-14T00:00:42.482809-05:00',
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Fetched purchase history',
                    data: [
                      {
                        id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                        amount: 20000,
                        phone_number: '+2348068120887',
                        network: 'mtn',
                        debit_amount: 19800,
                        commission_earned: 200,
                        created_at: '2022-05-14T00:00:42.482809-05:00',
                      },
                      {
                        id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                        amount: 20000,
                        phone_number: '+2348068120887',
                        network: 'mtn',
                        debit_amount: 19800,
                        commission_earned: 200,
                        created_at: '2022-05-14T00:00:42.482809-05:00',
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Fetched purchase history',
                  data: [
                    {
                      id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                      amount: 20000,
                      phone_number: '+2348068120887',
                      network: 'mtn',
                      debit_amount: 19800,
                      commission_earned: 200,
                      created_at: '2022-05-14T00:00:42.482809-05:00',
                    },
                    {
                      id: 'cceb0cdb-2b76-4e39-b23b-504fbdb0c99e',
                      amount: 20000,
                      phone_number: '+2348068120887',
                      network: 'mtn',
                      debit_amount: 19800,
                      commission_earned: 200,
                      created_at: '2022-05-14T00:00:42.482809-05:00',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/data': {
      post: {
        summary: 'Buy Data',
        description: '',
        operationId: 'postV1BillsData',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  identifier: {
                    type: 'string',
                  },
                  bundle_identifier: {
                    type: 'string',
                  },
                  phone_number: {
                    type: 'string',
                  },
                  amount: {
                    type: 'integer',
                    default: '10000',
                  },
                },
                required: [
                  'identifier',
                  'bundle_identifier',
                  'phone_number',
                  'amount',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Purchased data successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '63b82e0c-c9fd-4d83-bd97-da1a83f6f704',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        phone_number: {
                          type: 'string',
                          example: '2347036949054',
                        },
                        network: {
                          type: 'string',
                          example: 'MTN',
                        },
                        bundle: {
                          type: 'string',
                          example: '100MB Daily for Daily - Daily',
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        amount: {
                          type: 'integer',
                          example: 10000,
                        },
                        debit_amount: {
                          type: 'integer',
                          example: 10000,
                        },
                        commission_earned: {
                          type: 'integer',
                          example: 0,
                        },
                        created_at: {
                          type: 'string',
                          example: '2024-08-15T08:21:49.27205+01:00',
                        },
                      },
                      example: {
                        id: '63b82e0c-c9fd-4d83-bd97-da1a83f6f704',
                        status: 'SUCCESS',
                        phone_number: '2347036949054',
                        network: 'MTN',
                        bundle: '100MB Daily for Daily - Daily',
                        currency: 'NGN',
                        amount: 10000,
                        debit_amount: 10000,
                        commission_earned: 0,
                        created_at: '2024-08-15T08:21:49.27205+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Purchased data successfully',
                    data: {
                      id: '63b82e0c-c9fd-4d83-bd97-da1a83f6f704',
                      status: 'SUCCESS',
                      phone_number: '2347036949054',
                      network: 'MTN',
                      bundle: '100MB Daily for Daily - Daily',
                      currency: 'NGN',
                      amount: 10000,
                      debit_amount: 10000,
                      commission_earned: 0,
                      created_at: '2024-08-15T08:21:49.27205+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Purchased data successfully',
                  data: {
                    id: '63b82e0c-c9fd-4d83-bd97-da1a83f6f704',
                    status: 'SUCCESS',
                    phone_number: '2347036949054',
                    network: 'MTN',
                    bundle: '100MB Daily for Daily - Daily',
                    currency: 'NGN',
                    amount: 10000,
                    debit_amount: 10000,
                    commission_earned: 0,
                    created_at: '2024-08-15T08:21:49.27205+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/cable': {
      post: {
        summary: 'Buy Cable TV',
        description:
          'This resource allows you to purchase cable TV subscription.',
        operationId: 'postV1BillsCable',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'integer',
                    description:
                      'The amount to pay, in the lowest currency denomination.',
                    default: '580000',
                  },
                  serial_number: {
                    type: 'string',
                    default: '258914450',
                  },
                  identifier: {
                    type: 'string',
                    default: 'dstv-ng',
                  },
                  duration: {
                    type: 'string',
                    default: '1',
                  },
                  subscription_id: {
                    type: 'string',
                    default: 'COMPE36',
                  },
                  addons: {
                    type: 'array',
                    default: 'FRN7E36',
                  },
                },
                required: ['amount', 'serial_number', 'identifier'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Cable payment successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '4c4832d0-ad11-4695-a078-8f1380a3cdb6',
                        },
                        smartcard_number: {
                          type: 'string',
                          example: '258914450',
                        },
                        provider: {
                          type: 'string',
                          example: 'DSTV Nigeria',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        amount: {
                          type: 'integer',
                          example: 580000,
                        },
                        debit_amount: {
                          type: 'integer',
                          example: 580000,
                        },
                        commission_earned: {
                          type: 'integer',
                          example: 0,
                        },
                        plan: {
                          type: 'string',
                          example: 'DStv Compact',
                        },
                        duration: {
                          type: 'integer',
                          example: 1,
                        },
                        addons: {
                          type: 'array',
                          items: {
                            type: 'string',
                            example: 'DStv French Touch Add-on Bouquet E36',
                          },
                          example: ['DStv French Touch Add-on Bouquet E36'],
                        },
                        created_at: {
                          type: 'string',
                          example: '2024-08-15T10:01:24.562059+01:00',
                        },
                      },
                      example: {
                        id: '4c4832d0-ad11-4695-a078-8f1380a3cdb6',
                        smartcard_number: '258914450',
                        provider: 'DSTV Nigeria',
                        status: 'SUCCESS',
                        currency: 'NGN',
                        amount: 580000,
                        debit_amount: 580000,
                        commission_earned: 0,
                        plan: 'DStv Compact',
                        duration: 1,
                        addons: ['DStv French Touch Add-on Bouquet E36'],
                        created_at: '2024-08-15T10:01:24.562059+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Cable payment successfully',
                    data: {
                      id: '4c4832d0-ad11-4695-a078-8f1380a3cdb6',
                      smartcard_number: '258914450',
                      provider: 'DSTV Nigeria',
                      status: 'SUCCESS',
                      currency: 'NGN',
                      amount: 580000,
                      debit_amount: 580000,
                      commission_earned: 0,
                      plan: 'DStv Compact',
                      duration: 1,
                      addons: ['DStv French Touch Add-on Bouquet E36'],
                      created_at: '2024-08-15T10:01:24.562059+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Cable payment successfully',
                  data: {
                    id: '4c4832d0-ad11-4695-a078-8f1380a3cdb6',
                    smartcard_number: '258914450',
                    provider: 'DSTV Nigeria',
                    status: 'SUCCESS',
                    currency: 'NGN',
                    amount: 580000,
                    debit_amount: 580000,
                    commission_earned: 0,
                    plan: 'DStv Compact',
                    duration: 1,
                    addons: ['DStv French Touch Add-on Bouquet E36'],
                    created_at: '2024-08-15T10:01:24.562059+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/cable/subscriptions/{biller_identifier}': {
      get: {
        summary: 'Get Cable Subscription Plans',
        description:
          'This allows you fetch all available subscription plans for a cable network.',
        operationId: 'getV1BillsCableSubscriptionsBillerIdentifier',
        parameters: [
          {
            name: 'biller_identifier',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'gotv-ng',
            },
            example: 'gotv-ng',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'fetched cable subscription plan successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: {
                            type: 'string',
                            example: 'GOtv Jolli Bouquet',
                          },
                          plan_id: {
                            type: 'string',
                            example: 'GOTVNJ2',
                          },
                          subscription_plans: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: {
                                subscription_id: {
                                  type: 'string',
                                  example: '665df6192af87a39f2c5ff12',
                                },
                                duration: {
                                  type: 'object',
                                  properties: {
                                    value: {
                                      type: 'integer',
                                      example: 1,
                                    },
                                    type: {
                                      type: 'string',
                                      example: 'monthly',
                                    },
                                  },
                                  example: {
                                    value: 1,
                                    type: 'monthly',
                                  },
                                },
                                price: {
                                  type: 'integer',
                                  example: 280000,
                                },
                              },
                              example: {
                                subscription_id: '665df6192af87a39f2c5ff12',
                                duration: {
                                  value: 1,
                                  type: 'monthly',
                                },
                                price: 280000,
                              },
                            },
                            example: [
                              {
                                subscription_id: '665df6192af87a39f2c5ff12',
                                duration: {
                                  value: 1,
                                  type: 'monthly',
                                },
                                price: 280000,
                              },
                              {
                                subscription_id: '665df6192af87a39f2c5ff13',
                                duration: {
                                  value: 2,
                                  type: 'monthly',
                                },
                                price: 560000,
                              },
                              {
                                subscription_id: '665df6192af87a39f2c5ff14',
                                duration: {
                                  value: 3,
                                  type: 'monthly',
                                },
                                price: 840000,
                              },
                              {
                                subscription_id: '665df6192af87a39f2c5ff15',
                                duration: {
                                  value: 4,
                                  type: 'monthly',
                                },
                                price: 1120000,
                              },
                              {
                                subscription_id: '665df6192af87a39f2c5ff16',
                                duration: {
                                  value: 5,
                                  type: 'monthly',
                                },
                                price: 1400000,
                              },
                              {
                                subscription_id: '665df6192af87a39f2c5ff17',
                                duration: {
                                  value: 6,
                                  type: 'monthly',
                                },
                                price: 1680000,
                              },
                            ],
                          },
                        },
                        example: {
                          title: 'GOtv Jolli Bouquet',
                          plan_id: 'GOTVNJ2',
                          subscription_plans: [
                            {
                              subscription_id: '665df6192af87a39f2c5ff12',
                              duration: {
                                value: 1,
                                type: 'monthly',
                              },
                              price: 280000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff13',
                              duration: {
                                value: 2,
                                type: 'monthly',
                              },
                              price: 560000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff14',
                              duration: {
                                value: 3,
                                type: 'monthly',
                              },
                              price: 840000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff15',
                              duration: {
                                value: 4,
                                type: 'monthly',
                              },
                              price: 1120000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff16',
                              duration: {
                                value: 5,
                                type: 'monthly',
                              },
                              price: 1400000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff17',
                              duration: {
                                value: 6,
                                type: 'monthly',
                              },
                              price: 1680000,
                            },
                          ],
                        },
                      },
                      example: [
                        {
                          title: 'GOtv Jolli Bouquet',
                          plan_id: 'GOTVNJ2',
                          subscription_plans: [
                            {
                              subscription_id: '665df6192af87a39f2c5ff12',
                              duration: {
                                value: 1,
                                type: 'monthly',
                              },
                              price: 280000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff13',
                              duration: {
                                value: 2,
                                type: 'monthly',
                              },
                              price: 560000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff14',
                              duration: {
                                value: 3,
                                type: 'monthly',
                              },
                              price: 840000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff15',
                              duration: {
                                value: 4,
                                type: 'monthly',
                              },
                              price: 1120000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff16',
                              duration: {
                                value: 5,
                                type: 'monthly',
                              },
                              price: 1400000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff17',
                              duration: {
                                value: 6,
                                type: 'monthly',
                              },
                              price: 1680000,
                            },
                          ],
                        },
                        {
                          title: 'GOtv Jinja Bouquet',
                          plan_id: 'GOTVNJ1',
                          subscription_plans: [
                            {
                              subscription_id: '665df6192af87a39f2c5ff1e',
                              duration: {
                                value: 1,
                                type: 'monthly',
                              },
                              price: 190000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff1f',
                              duration: {
                                value: 2,
                                type: 'monthly',
                              },
                              price: 380000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff20',
                              duration: {
                                value: 3,
                                type: 'monthly',
                              },
                              price: 570000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff21',
                              duration: {
                                value: 4,
                                type: 'monthly',
                              },
                              price: 760000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff22',
                              duration: {
                                value: 5,
                                type: 'monthly',
                              },
                              price: 950000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff23',
                              duration: {
                                value: 6,
                                type: 'monthly',
                              },
                              price: 1140000,
                            },
                          ],
                        },
                        {
                          title: 'GOtv Supa Plus',
                          plan_id: 'GOTVSUPAPLUS',
                          subscription_plans: [
                            {
                              subscription_id: '665df6192af87a39f2c5ff2a',
                              duration: {
                                value: 1,
                                type: 'monthly',
                              },
                              price: 1050000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff2b',
                              duration: {
                                value: 2,
                                type: 'monthly',
                              },
                              price: 2100000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff2c',
                              duration: {
                                value: 3,
                                type: 'monthly',
                              },
                              price: 3150000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff2d',
                              duration: {
                                value: 4,
                                type: 'monthly',
                              },
                              price: 4200000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff2e',
                              duration: {
                                value: 5,
                                type: 'monthly',
                              },
                              price: 5250000,
                            },
                            {
                              subscription_id: '665df6192af87a39f2c5ff2f',
                              duration: {
                                value: 6,
                                type: 'monthly',
                              },
                              price: 6300000,
                            },
                          ],
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'fetched cable subscription plan successfully',
                    data: [
                      {
                        title: 'GOtv Jolli Bouquet',
                        plan_id: 'GOTVNJ2',
                        subscription_plans: [
                          {
                            subscription_id: '665df6192af87a39f2c5ff12',
                            duration: {
                              value: 1,
                              type: 'monthly',
                            },
                            price: 280000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff13',
                            duration: {
                              value: 2,
                              type: 'monthly',
                            },
                            price: 560000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff14',
                            duration: {
                              value: 3,
                              type: 'monthly',
                            },
                            price: 840000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff15',
                            duration: {
                              value: 4,
                              type: 'monthly',
                            },
                            price: 1120000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff16',
                            duration: {
                              value: 5,
                              type: 'monthly',
                            },
                            price: 1400000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff17',
                            duration: {
                              value: 6,
                              type: 'monthly',
                            },
                            price: 1680000,
                          },
                        ],
                      },
                      {
                        title: 'GOtv Jinja Bouquet',
                        plan_id: 'GOTVNJ1',
                        subscription_plans: [
                          {
                            subscription_id: '665df6192af87a39f2c5ff1e',
                            duration: {
                              value: 1,
                              type: 'monthly',
                            },
                            price: 190000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff1f',
                            duration: {
                              value: 2,
                              type: 'monthly',
                            },
                            price: 380000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff20',
                            duration: {
                              value: 3,
                              type: 'monthly',
                            },
                            price: 570000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff21',
                            duration: {
                              value: 4,
                              type: 'monthly',
                            },
                            price: 760000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff22',
                            duration: {
                              value: 5,
                              type: 'monthly',
                            },
                            price: 950000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff23',
                            duration: {
                              value: 6,
                              type: 'monthly',
                            },
                            price: 1140000,
                          },
                        ],
                      },
                      {
                        title: 'GOtv Supa Plus',
                        plan_id: 'GOTVSUPAPLUS',
                        subscription_plans: [
                          {
                            subscription_id: '665df6192af87a39f2c5ff2a',
                            duration: {
                              value: 1,
                              type: 'monthly',
                            },
                            price: 1050000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff2b',
                            duration: {
                              value: 2,
                              type: 'monthly',
                            },
                            price: 2100000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff2c',
                            duration: {
                              value: 3,
                              type: 'monthly',
                            },
                            price: 3150000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff2d',
                            duration: {
                              value: 4,
                              type: 'monthly',
                            },
                            price: 4200000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff2e',
                            duration: {
                              value: 5,
                              type: 'monthly',
                            },
                            price: 5250000,
                          },
                          {
                            subscription_id: '665df6192af87a39f2c5ff2f',
                            duration: {
                              value: 6,
                              type: 'monthly',
                            },
                            price: 6300000,
                          },
                        ],
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'fetched cable subscription plan successfully',
                  data: [
                    {
                      title: 'GOtv Jolli Bouquet',
                      plan_id: 'GOTVNJ2',
                      subscription_plans: [
                        {
                          subscription_id: '665df6192af87a39f2c5ff12',
                          duration: {
                            value: 1,
                            type: 'monthly',
                          },
                          price: 280000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff13',
                          duration: {
                            value: 2,
                            type: 'monthly',
                          },
                          price: 560000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff14',
                          duration: {
                            value: 3,
                            type: 'monthly',
                          },
                          price: 840000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff15',
                          duration: {
                            value: 4,
                            type: 'monthly',
                          },
                          price: 1120000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff16',
                          duration: {
                            value: 5,
                            type: 'monthly',
                          },
                          price: 1400000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff17',
                          duration: {
                            value: 6,
                            type: 'monthly',
                          },
                          price: 1680000,
                        },
                      ],
                    },
                    {
                      title: 'GOtv Jinja Bouquet',
                      plan_id: 'GOTVNJ1',
                      subscription_plans: [
                        {
                          subscription_id: '665df6192af87a39f2c5ff1e',
                          duration: {
                            value: 1,
                            type: 'monthly',
                          },
                          price: 190000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff1f',
                          duration: {
                            value: 2,
                            type: 'monthly',
                          },
                          price: 380000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff20',
                          duration: {
                            value: 3,
                            type: 'monthly',
                          },
                          price: 570000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff21',
                          duration: {
                            value: 4,
                            type: 'monthly',
                          },
                          price: 760000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff22',
                          duration: {
                            value: 5,
                            type: 'monthly',
                          },
                          price: 950000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff23',
                          duration: {
                            value: 6,
                            type: 'monthly',
                          },
                          price: 1140000,
                        },
                      ],
                    },
                    {
                      title: 'GOtv Supa Plus',
                      plan_id: 'GOTVSUPAPLUS',
                      subscription_plans: [
                        {
                          subscription_id: '665df6192af87a39f2c5ff2a',
                          duration: {
                            value: 1,
                            type: 'monthly',
                          },
                          price: 1050000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff2b',
                          duration: {
                            value: 2,
                            type: 'monthly',
                          },
                          price: 2100000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff2c',
                          duration: {
                            value: 3,
                            type: 'monthly',
                          },
                          price: 3150000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff2d',
                          duration: {
                            value: 4,
                            type: 'monthly',
                          },
                          price: 4200000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff2e',
                          duration: {
                            value: 5,
                            type: 'monthly',
                          },
                          price: 5250000,
                        },
                        {
                          subscription_id: '665df6192af87a39f2c5ff2f',
                          duration: {
                            value: 6,
                            type: 'monthly',
                          },
                          price: 6300000,
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/cable/addon/{biller}/{addon_id}': {
      get: {
        summary: 'Get Cable Addons',
        description:
          'This resource enables you to get cable tv add-ons for a particular network.',
        operationId: 'getV1BillsCableAddonBillerAddonId',
        parameters: [
          {
            name: 'addon_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'COMPE36',
            },
            example: 'COMPE36',
          },
          {
            name: 'biller',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              default: 'dstv-ng',
            },
            example: 'dstv-ng',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/utility': {
      post: {
        summary: 'Buy Energy/Utility',
        description:
          'This resource allows you pay for energy/utility bills for Kenyan customers.',
        operationId: 'postV1BillsUtility',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'integer',
                    description:
                      'The amount to pay, in the lowest currency denomination.',
                    default: '80000',
                  },
                  account_number: {
                    type: 'string',
                    default: '7552231950',
                  },
                  identifier: {
                    type: 'string',
                  },
                },
                required: ['amount', 'account_number', 'identifier'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Cable payment successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'd1f923e7-01b5-4302-9bb7-e5869fa425a3',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        account_number: {
                          type: 'string',
                          example: '7552231950',
                        },
                        network: {
                          type: 'string',
                          example: 'GOTV',
                        },
                        currency: {
                          type: 'string',
                          example: 'KES',
                        },
                        amount: {
                          type: 'integer',
                          example: 80000,
                        },
                        debit_amount: {
                          type: 'integer',
                          example: 80000,
                        },
                        commission_earned: {
                          type: 'integer',
                          example: 0,
                        },
                        created_at: {
                          type: 'string',
                          example: '2023-12-28T11:08:07.788237+01:00',
                        },
                      },
                      example: {
                        id: 'd1f923e7-01b5-4302-9bb7-e5869fa425a3',
                        status: 'SUCCESS',
                        account_number: '7552231950',
                        network: 'GOTV',
                        currency: 'KES',
                        amount: 80000,
                        debit_amount: 80000,
                        commission_earned: 0,
                        created_at: '2023-12-28T11:08:07.788237+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Cable payment successfully',
                    data: {
                      id: 'd1f923e7-01b5-4302-9bb7-e5869fa425a3',
                      status: 'SUCCESS',
                      account_number: '7552231950',
                      network: 'GOTV',
                      currency: 'KES',
                      amount: 80000,
                      debit_amount: 80000,
                      commission_earned: 0,
                      created_at: '2023-12-28T11:08:07.788237+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Cable payment successfully',
                  data: {
                    id: 'd1f923e7-01b5-4302-9bb7-e5869fa425a3',
                    status: 'SUCCESS',
                    account_number: '7552231950',
                    network: 'GOTV',
                    currency: 'KES',
                    amount: 80000,
                    debit_amount: 80000,
                    commission_earned: 0,
                    created_at: '2023-12-28T11:08:07.788237+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/electricity/resolve-account': {
      post: {
        summary: 'Resolve Electricity Meter Account',
        description: '',
        operationId: 'postV1BillsElectricityResolveAccount',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  meter_number: {
                    type: 'string',
                    default: '45067338348',
                  },
                  identifier: {
                    type: 'string',
                    default: 'ikeja-electricity-prepaid-ng',
                  },
                },
                required: ['meter_number', 'identifier'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'resolved account successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        meter_number: {
                          type: 'string',
                          example: '6528651914',
                        },
                        identifier: {
                          type: 'string',
                          example: 'ikeja-electricity-prepaid-ng',
                        },
                        name: {
                          type: 'string',
                          example: 'NP NGEMA',
                        },
                      },
                      example: {
                        meter_number: '6528651914',
                        identifier: 'ikeja-electricity-prepaid-ng',
                        name: 'NP NGEMA',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'resolved account successfully',
                    data: {
                      meter_number: '6528651914',
                      identifier: 'ikeja-electricity-prepaid-ng',
                      name: 'NP NGEMA',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'resolved account successfully',
                  data: {
                    meter_number: '6528651914',
                    identifier: 'ikeja-electricity-prepaid-ng',
                    name: 'NP NGEMA',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/bills/electricity': {
      post: {
        summary: 'Buy Electricity',
        description: '',
        operationId: 'postV1BillsElectricity',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  meter_number: {
                    type: 'string',
                    default: '45067338348',
                  },
                  identifier: {
                    type: 'string',
                    default: 'ikeja-electricity-prepaid-ng',
                  },
                  amount: {
                    type: 'integer',
                  },
                  phone_number: {
                    type: 'string',
                  },
                },
                required: [
                  'meter_number',
                  'identifier',
                  'amount',
                  'phone_number',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'electricity topup successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '677191d2-48f3-4115-b115-d3e9192ff448',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        meter_number: {
                          type: 'string',
                          example: '6528651914',
                        },
                        amount: {
                          type: 'integer',
                          example: 100000,
                        },
                        debit_amount: {
                          type: 'integer',
                          example: 100000,
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        commission_earned: {
                          type: 'integer',
                          example: 0,
                        },
                        electricity_distributor: {
                          type: 'string',
                          example: 'Ikeja Electric Prepaid',
                        },
                        token: {
                          type: 'string',
                          example: '53268833131286689562',
                        },
                        token_amount: {
                          type: 'integer',
                          example: 102326,
                        },
                        configuration_token: {
                          type: 'string',
                          example: '53268833131286689561',
                        },
                        reset_token: {
                          type: 'string',
                          example: '53268833131286689563',
                        },
                        amount_of_power: {
                          type: 'string',
                          example: '16.3 kWh',
                        },
                        created_at: {
                          type: 'string',
                          example: '2024-05-31T03:05:02.625513+01:00',
                        },
                      },
                      example: {
                        id: '677191d2-48f3-4115-b115-d3e9192ff448',
                        status: 'SUCCESS',
                        meter_number: '6528651914',
                        amount: 100000,
                        debit_amount: 100000,
                        currency: 'NGN',
                        commission_earned: 0,
                        electricity_distributor: 'Ikeja Electric Prepaid',
                        token: '53268833131286689562',
                        token_amount: 102326,
                        configuration_token: '53268833131286689561',
                        reset_token: '53268833131286689563',
                        amount_of_power: '16.3 kWh',
                        created_at: '2024-05-31T03:05:02.625513+01:00',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'electricity topup successful',
                    data: {
                      id: '677191d2-48f3-4115-b115-d3e9192ff448',
                      status: 'SUCCESS',
                      meter_number: '6528651914',
                      amount: 100000,
                      debit_amount: 100000,
                      currency: 'NGN',
                      commission_earned: 0,
                      electricity_distributor: 'Ikeja Electric Prepaid',
                      token: '53268833131286689562',
                      token_amount: 102326,
                      configuration_token: '53268833131286689561',
                      reset_token: '53268833131286689563',
                      amount_of_power: '16.3 kWh',
                      created_at: '2024-05-31T03:05:02.625513+01:00',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'electricity topup successful',
                  data: {
                    id: '677191d2-48f3-4115-b115-d3e9192ff448',
                    status: 'SUCCESS',
                    meter_number: '6528651914',
                    amount: 100000,
                    debit_amount: 100000,
                    currency: 'NGN',
                    commission_earned: 0,
                    electricity_distributor: 'Ikeja Electric Prepaid',
                    token: '53268833131286689562',
                    token_amount: 102326,
                    configuration_token: '53268833131286689561',
                    reset_token: '53268833131286689563',
                    amount_of_power: '16.3 kWh',
                    created_at: '2024-05-31T03:05:02.625513+01:00',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/transfers': {
      post: {
        summary: 'Local Payments (Africa)',
        description:
          'This resource enables a bank transfer from your maplerad balance. We currently have provision for NGN Bank Transfer, Mobile Money Transfer, Maplerad Pay (transfer to another Maplerad account).',
        operationId: 'postV1Transfers',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bank_code: {
                    type: 'string',
                    description:
                      "The institution's (usually) three-digits code.",
                  },
                  account_number: {
                    type: 'string',
                    description:
                      "The recipient's NUBAN. It must match appropriately with the bank_code.",
                  },
                  amount: {
                    type: 'integer',
                    description:
                      'The amount in the lowest denomination of the currency e.g cents for USD or kobo for NGN.',
                  },
                  reason: {
                    type: 'string',
                  },
                  currency: {
                    type: 'string',
                    description:
                      'Specifies the wallet that will be debited. NGN for Naira etc. GHS, KES and XAF are only available for the MobileMoney scheme.',
                    default: 'NGN',
                  },
                  reference: {
                    type: 'string',
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      scheme: {
                        type: 'string',
                        description:
                          'The scheme for the transfer, available option is MOBILEMONEY.',
                        default: 'DOM',
                      },
                      counterparty: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                          },
                        },
                      },
                    },
                  },
                },
                required: ['bank_code', 'account_number', 'amount', 'currency'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    bank_code: {
                      type: 'string',
                      example: '106',
                    },
                    account_number: {
                      type: 'string',
                      example: '0000000000',
                    },
                    amount: {
                      type: 'integer',
                      example: 100,
                    },
                    reason: {
                      type: 'string',
                      example: 'enjoy',
                    },
                    currency: {
                      type: 'string',
                      example: 'USD',
                    },
                    reference: {
                      type: 'string',
                      example: 'maplerad_reference000001',
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        scheme: {
                          type: 'string',
                          example: 'DOM',
                        },
                        sender: {
                          type: 'object',
                          properties: {
                            first_name: {
                              type: 'string',
                              example: 'Ciroma',
                            },
                            last_name: {
                              type: 'string',
                              example: 'Adekunle',
                            },
                            phone_number: {
                              type: 'string',
                              example: '08011533098',
                            },
                            address: {
                              type: 'string',
                              example: 'Lagos, Nigeria',
                            },
                            country: {
                              type: 'string',
                              example: 'NG',
                            },
                          },
                          example: {
                            first_name: 'Ciroma',
                            last_name: 'Adekunle',
                            phone_number: '08011533098',
                            address: 'Lagos, Nigeria',
                            country: 'NG',
                          },
                        },
                        counterparty: {
                          type: 'object',
                          properties: {
                            first_name: {
                              type: 'string',
                              example: 'Jane',
                            },
                            last_name: {
                              type: 'string',
                              example: 'Doe',
                            },
                            address: {
                              type: 'string',
                              example: '12, Krusty Crab Street, Pineapple Land',
                            },
                            phone_number: {
                              type: 'string',
                              example: '08012345678',
                            },
                            identity_type: {
                              type: 'string',
                              example: '',
                            },
                            country: {
                              type: 'string',
                              example: 'NG',
                            },
                          },
                          example: {
                            first_name: 'Jane',
                            last_name: 'Doe',
                            address: '12, Krusty Crab Street, Pineapple Land',
                            phone_number: '08012345678',
                            identity_type: '',
                            country: 'NG',
                          },
                        },
                      },
                      example: {
                        scheme: 'DOM',
                        sender: {
                          first_name: 'Ciroma',
                          last_name: 'Adekunle',
                          phone_number: '08011533098',
                          address: 'Lagos, Nigeria',
                          country: 'NG',
                        },
                        counterparty: {
                          first_name: 'Jane',
                          last_name: 'Doe',
                          address: '12, Krusty Crab Street, Pineapple Land',
                          phone_number: '08012345678',
                          identity_type: '',
                          country: 'NG',
                        },
                      },
                    },
                  },
                  example: {
                    bank_code: '106',
                    account_number: '0000000000',
                    amount: 100,
                    reason: 'enjoy',
                    currency: 'USD',
                    reference: 'maplerad_reference000001',
                    meta: {
                      scheme: 'DOM',
                      sender: {
                        first_name: 'Ciroma',
                        last_name: 'Adekunle',
                        phone_number: '08011533098',
                        address: 'Lagos, Nigeria',
                        country: 'NG',
                      },
                      counterparty: {
                        first_name: 'Jane',
                        last_name: 'Doe',
                        address: '12, Krusty Crab Street, Pineapple Land',
                        phone_number: '08012345678',
                        identity_type: '',
                        country: 'NG',
                      },
                    },
                  },
                },
                example: {
                  bank_code: '106',
                  account_number: '0000000000',
                  amount: 100,
                  reason: 'enjoy',
                  currency: 'USD',
                  reference: 'maplerad_reference000001',
                  meta: {
                    scheme: 'DOM',
                    sender: {
                      first_name: 'Ciroma',
                      last_name: 'Adekunle',
                      phone_number: '08011533098',
                      address: 'Lagos, Nigeria',
                      country: 'NG',
                    },
                    counterparty: {
                      first_name: 'Jane',
                      last_name: 'Doe',
                      address: '12, Krusty Crab Street, Pineapple Land',
                      phone_number: '08012345678',
                      identity_type: '',
                      country: 'NG',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v2/transfers/usd': {
      post: {
        summary: 'US Payments (ACH/Wire)',
        description:
          'This resource allows you send USD to a registered counterparty. NOTE: This is a v2 endpoint.',
        operationId: 'postV2TransfersUsd',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  counterparty_id: {
                    type: 'string',
                    description: 'The registered counterparty ID.',
                  },
                  memo: {
                    type: 'string',
                    description: 'Informal short description of the payment.',
                    default: 'invoice #1',
                  },
                  amount: {
                    type: 'integer',
                    description: 'Amount in cents.',
                    default: '500',
                  },
                  payment_rail: {
                    type: 'string',
                    default: 'ACH',
                  },
                  reason: {
                    type: 'string',
                    description: 'Describe what the payment is for.',
                    default: 'payment for goods and services',
                  },
                  reference: {
                    type: 'string',
                    default: '383e4845-dd00-4eb8-8520-67ab4bdcd3d8',
                  },
                },
                required: [
                  'counterparty_id',
                  'memo',
                  'amount',
                  'payment_rail',
                  'reason',
                  'reference',
                ],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Transfer queued successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: 'a8f548de-fd6e-408e-8497-e7eb31aed2fb',
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        status: {
                          type: 'string',
                          example: 'PENDING',
                        },
                        entry: {
                          type: 'string',
                          example: 'DEBIT',
                        },
                        type: {
                          type: 'string',
                          example: 'TRANSFER',
                        },
                        amount: {
                          type: 'integer',
                          example: 1900,
                        },
                        summary: {
                          type: 'string',
                          example:
                            'Transfer | John Doe - 900516649780 - Bank of Nowhere',
                        },
                        reason: {
                          type: 'string',
                          example: 'Testing testing',
                        },
                        fee: {
                          type: 'integer',
                          example: 2500,
                        },
                        reference: {},
                        created_at: {
                          type: 'string',
                          example: '2024-11-27T13:59:19.989188+01:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2024-11-27T13:59:35.243447+01:00',
                        },
                        counterparty: {
                          type: 'object',
                          properties: {
                            id: {
                              type: 'string',
                              example: 'c0994b35-1856-46b9-bec4-886d88af6fe3',
                            },
                            account_number: {
                              type: 'string',
                              example: '900516649780',
                            },
                            account_name: {
                              type: 'string',
                              example: 'John Doe',
                            },
                            bank_code: {
                              type: 'string',
                              example: 'LAKEUS41',
                            },
                            bank_name: {
                              type: 'string',
                              example: 'Bank of Nowhere',
                            },
                          },
                          example: {
                            id: 'c0994b35-1856-46b9-bec4-886d88af6fe3',
                            account_number: '900516649780',
                            account_name: 'John Doe',
                            bank_code: 'LAKEUS41',
                            bank_name: 'Bank of Nowhere',
                          },
                        },
                      },
                      example: {
                        id: 'a8f548de-fd6e-408e-8497-e7eb31aed2fb',
                        currency: 'USD',
                        status: 'PENDING',
                        entry: 'DEBIT',
                        type: 'TRANSFER',
                        amount: 1900,
                        summary:
                          'Transfer | John Doe - 900516649780 - Bank of Nowhere',
                        reason: 'Testing testing',
                        fee: 2500,
                        reference: null,
                        created_at: '2024-11-27T13:59:19.989188+01:00',
                        updated_at: '2024-11-27T13:59:35.243447+01:00',
                        counterparty: {
                          id: 'c0994b35-1856-46b9-bec4-886d88af6fe3',
                          account_number: '900516649780',
                          account_name: 'John Doe',
                          bank_code: 'LAKEUS41',
                          bank_name: 'Bank of Nowhere',
                        },
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Transfer queued successfully',
                    data: {
                      id: 'a8f548de-fd6e-408e-8497-e7eb31aed2fb',
                      currency: 'USD',
                      status: 'PENDING',
                      entry: 'DEBIT',
                      type: 'TRANSFER',
                      amount: 1900,
                      summary:
                        'Transfer | John Doe - 900516649780 - Bank of Nowhere',
                      reason: 'Testing testing',
                      fee: 2500,
                      reference: null,
                      created_at: '2024-11-27T13:59:19.989188+01:00',
                      updated_at: '2024-11-27T13:59:35.243447+01:00',
                      counterparty: {
                        id: 'c0994b35-1856-46b9-bec4-886d88af6fe3',
                        account_number: '900516649780',
                        account_name: 'John Doe',
                        bank_code: 'LAKEUS41',
                        bank_name: 'Bank of Nowhere',
                      },
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Transfer queued successfully',
                  data: {
                    id: 'a8f548de-fd6e-408e-8497-e7eb31aed2fb',
                    currency: 'USD',
                    status: 'PENDING',
                    entry: 'DEBIT',
                    type: 'TRANSFER',
                    amount: 1900,
                    summary:
                      'Transfer | John Doe - 900516649780 - Bank of Nowhere',
                    reason: 'Testing testing',
                    fee: 2500,
                    reference: null,
                    created_at: '2024-11-27T13:59:19.989188+01:00',
                    updated_at: '2024-11-27T13:59:35.243447+01:00',
                    counterparty: {
                      id: 'c0994b35-1856-46b9-bec4-886d88af6fe3',
                      account_number: '900516649780',
                      account_name: 'John Doe',
                      bank_code: 'LAKEUS41',
                      bank_name: 'Bank of Nowhere',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/transfers/{transfer_id}': {
      get: {
        summary: 'Verify Transfer by ID/Reference',
        description:
          'This resource returns a transfer details by its reference or ID.',
        operationId: 'getV1TransfersTransferId',
        parameters: [
          {
            name: 'transfer_id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: false,
                    },
                    message: {
                      type: 'string',
                      example: 'Transfer retrieved successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '4a5acb1a-4732-4fde-9756-1050985a71fe',
                        },
                        account_number: {
                          type: 'string',
                          example: '0690000046',
                        },
                        bank_code: {
                          type: 'string',
                          example: '044',
                        },
                        currency: {
                          type: 'string',
                          example: 'NGN',
                        },
                        status: {
                          type: 'string',
                          example: 'PENDING',
                        },
                        entry: {
                          type: 'string',
                          example: 'DEBIT',
                        },
                        type: {
                          type: 'string',
                          example: 'TRANSFER',
                        },
                        amount: {
                          type: 'integer',
                          example: 9500,
                        },
                        summary: {
                          type: 'string',
                          example:
                            'Transfer | Test Account - 0690000046 - Test Bank',
                        },
                        reason: {
                          type: 'string',
                          example: 'Maplerad Transfer',
                        },
                        fee: {
                          type: 'integer',
                          example: 4000,
                        },
                      },
                      example: {
                        id: '4a5acb1a-4732-4fde-9756-1050985a71fe',
                        account_number: '0690000046',
                        bank_code: '044',
                        currency: 'NGN',
                        status: 'PENDING',
                        entry: 'DEBIT',
                        type: 'TRANSFER',
                        amount: 9500,
                        summary:
                          'Transfer | Test Account - 0690000046 - Test Bank',
                        reason: 'Maplerad Transfer',
                        fee: 4000,
                      },
                    },
                  },
                  example: {
                    status: false,
                    message: 'Transfer retrieved successfully',
                    data: {
                      id: '4a5acb1a-4732-4fde-9756-1050985a71fe',
                      account_number: '0690000046',
                      bank_code: '044',
                      currency: 'NGN',
                      status: 'PENDING',
                      entry: 'DEBIT',
                      type: 'TRANSFER',
                      amount: 9500,
                      summary:
                        'Transfer | Test Account - 0690000046 - Test Bank',
                      reason: 'Maplerad Transfer',
                      fee: 4000,
                    },
                  },
                },
                example: {
                  status: false,
                  message: 'Transfer retrieved successfully',
                  data: {
                    id: '4a5acb1a-4732-4fde-9756-1050985a71fe',
                    account_number: '0690000046',
                    bank_code: '044',
                    currency: 'NGN',
                    status: 'PENDING',
                    entry: 'DEBIT',
                    type: 'TRANSFER',
                    amount: 9500,
                    summary: 'Transfer | Test Account - 0690000046 - Test Bank',
                    reason: 'Maplerad Transfer',
                    fee: 4000,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/transactions': {
      get: {
        summary: 'Get All Transactions',
        description:
          'This resource returns a list of all transactions processed.',
        operationId: 'getV1Transactions',
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Fetched transactions',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          ID: {
                            type: 'string',
                            example: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                          },
                          CreatedAt: {
                            type: 'string',
                            example: '2022-06-20T10:30:58.965949-05:00',
                          },
                          UpdatedAt: {
                            type: 'string',
                            example: '2022-06-20T10:30:58.965949-05:00',
                          },
                          DeletedAt: {},
                          business_id: {
                            type: 'string',
                            example: 'd5c9ce2b-9f8e-46cc-972b-eb8cd1322ddc',
                          },
                          source_currency_id: {
                            type: 'string',
                            example: 'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                          },
                          destination_currency_id: {
                            type: 'string',
                            example: 'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                          },
                          status: {
                            type: 'string',
                            example: 'SUCCESS',
                          },
                          entry: {
                            type: 'string',
                            example: 'CREDIT',
                          },
                          channel: {
                            type: 'string',
                            example: 'ACCOUNT',
                          },
                          type: {
                            type: 'string',
                            example: 'FUNDING',
                          },
                          partner: {
                            type: 'string',
                            example: 'Maplerad',
                          },
                          source_amount: {
                            type: 'integer',
                            example: 500000,
                          },
                          summary: {
                            type: 'string',
                            example: 'Test Funding',
                          },
                          reason: {},
                          destination_amount: {
                            type: 'integer',
                            example: 500000,
                          },
                          reference: {},
                          fee: {
                            type: 'integer',
                            example: 0,
                          },
                          meta: {},
                        },
                        example: {
                          ID: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                          CreatedAt: '2022-06-20T10:30:58.965949-05:00',
                          UpdatedAt: '2022-06-20T10:30:58.965949-05:00',
                          DeletedAt: null,
                          business_id: 'd5c9ce2b-9f8e-46cc-972b-eb8cd1322ddc',
                          source_currency_id:
                            'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                          destination_currency_id:
                            'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                          status: 'SUCCESS',
                          entry: 'CREDIT',
                          channel: 'ACCOUNT',
                          type: 'FUNDING',
                          partner: 'Maplerad',
                          source_amount: 500000,
                          summary: 'Test Funding',
                          reason: null,
                          destination_amount: 500000,
                          reference: null,
                          fee: 0,
                          meta: null,
                        },
                      },
                      example: [
                        {
                          ID: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                          CreatedAt: '2022-06-20T10:30:58.965949-05:00',
                          UpdatedAt: '2022-06-20T10:30:58.965949-05:00',
                          DeletedAt: null,
                          business_id: 'd5c9ce2b-9f8e-46cc-972b-eb8cd1322ddc',
                          source_currency_id:
                            'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                          destination_currency_id:
                            'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                          status: 'SUCCESS',
                          entry: 'CREDIT',
                          channel: 'ACCOUNT',
                          type: 'FUNDING',
                          partner: 'Maplerad',
                          source_amount: 500000,
                          summary: 'Test Funding',
                          reason: null,
                          destination_amount: 500000,
                          reference: null,
                          fee: 0,
                          meta: null,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Fetched transactions',
                    data: [
                      {
                        ID: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                        CreatedAt: '2022-06-20T10:30:58.965949-05:00',
                        UpdatedAt: '2022-06-20T10:30:58.965949-05:00',
                        DeletedAt: null,
                        business_id: 'd5c9ce2b-9f8e-46cc-972b-eb8cd1322ddc',
                        source_currency_id:
                          'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                        destination_currency_id:
                          'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                        status: 'SUCCESS',
                        entry: 'CREDIT',
                        channel: 'ACCOUNT',
                        type: 'FUNDING',
                        partner: 'Maplerad',
                        source_amount: 500000,
                        summary: 'Test Funding',
                        reason: null,
                        destination_amount: 500000,
                        reference: null,
                        fee: 0,
                        meta: null,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Fetched transactions',
                  data: [
                    {
                      ID: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                      CreatedAt: '2022-06-20T10:30:58.965949-05:00',
                      UpdatedAt: '2022-06-20T10:30:58.965949-05:00',
                      DeletedAt: null,
                      business_id: 'd5c9ce2b-9f8e-46cc-972b-eb8cd1322ddc',
                      source_currency_id:
                        'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                      destination_currency_id:
                        'ece3a30d-13b6-4ec9-9fe7-27809cbfa685',
                      status: 'SUCCESS',
                      entry: 'CREDIT',
                      channel: 'ACCOUNT',
                      type: 'FUNDING',
                      partner: 'Maplerad',
                      source_amount: 500000,
                      summary: 'Test Funding',
                      reason: null,
                      destination_amount: 500000,
                      reference: null,
                      fee: 0,
                      meta: null,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/transactions/{id}': {
      get: {
        summary: 'Get Transaction By ID/Reference',
        description:
          'This resource retrieves details of a transaction by its id or reference',
        operationId: 'getV1TransactionsId',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The ID or Reference for the transaction',
            schema: {
              type: 'string',
              description: 'The ID or Reference for the transaction',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Fetched transaction',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string',
                          example: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                        },
                        status: {
                          type: 'string',
                          example: 'SUCCESS',
                        },
                        entry: {
                          type: 'string',
                          example: 'DEBIT',
                        },
                        type: {
                          type: 'string',
                          example: 'CARD',
                        },
                        amount: {
                          type: 'integer',
                          example: 300,
                        },
                        fee: {
                          type: 'integer',
                          example: 100,
                        },
                        currency: {
                          type: 'string',
                          example: 'USD',
                        },
                        channel: {
                          type: 'string',
                          example: 'CARD',
                        },
                        summary: {
                          type: 'string',
                          example: 'Card Issuance & Funding',
                        },
                        reason: {},
                        reference: {},
                        account_id: {},
                        created_at: {
                          type: 'string',
                          example: '2023-01-05T00:58:07.402722+01:00',
                        },
                        updated_at: {
                          type: 'string',
                          example: '2023-01-05T00:58:07.402722+01:00',
                        },
                        customer: {},
                        source: {
                          type: 'object',
                          properties: {
                            bank_name: {
                              type: 'string',
                              example: '',
                            },
                            bank_code: {
                              type: 'string',
                              example: '',
                            },
                            account_name: {
                              type: 'string',
                              example: '',
                            },
                            account_number: {
                              type: 'string',
                              example: '',
                            },
                          },
                          example: {
                            bank_name: '',
                            bank_code: '',
                            account_name: '',
                            account_number: '',
                          },
                        },
                        ledger: {
                          type: 'object',
                          properties: {
                            transaction_id: {
                              type: 'string',
                              example: 'b9b82bee-ad70-4624-95a3-642daad93ba7',
                            },
                            wallet_id: {
                              type: 'string',
                              example: 'fe5fd272-a280-4815-a848-360df8fb6c19',
                            },
                            debit: {
                              type: 'integer',
                              example: 300,
                            },
                            credit: {
                              type: 'integer',
                              example: 0,
                            },
                            previous_balance: {
                              type: 'integer',
                              example: 98901,
                            },
                            current_balance: {
                              type: 'integer',
                              example: 9898200,
                            },
                            balance_type: {
                              type: 'string',
                              example: 'AVAILABLE',
                            },
                            reversal: {
                              type: 'boolean',
                              example: false,
                            },
                            created_at: {
                              type: 'string',
                              example: '2023-01-05T00:58:07.422524+01:00',
                            },
                            updated_at: {
                              type: 'string',
                              example: '2023-01-05T00:58:07.422524+01:00',
                            },
                          },
                          example: {
                            transaction_id:
                              'b9b82bee-ad70-4624-95a3-642daad93ba7',
                            wallet_id: 'fe5fd272-a280-4815-a848-360df8fb6c19',
                            debit: 300,
                            credit: 0,
                            previous_balance: 98901,
                            current_balance: 9898200,
                            balance_type: 'AVAILABLE',
                            reversal: false,
                            created_at: '2023-01-05T00:58:07.422524+01:00',
                            updated_at: '2023-01-05T00:58:07.422524+01:00',
                          },
                        },
                      },
                      example: {
                        id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                        status: 'SUCCESS',
                        entry: 'DEBIT',
                        type: 'CARD',
                        amount: 300,
                        fee: 100,
                        currency: 'USD',
                        channel: 'CARD',
                        summary: 'Card Issuance & Funding',
                        reason: null,
                        reference: null,
                        account_id: null,
                        created_at: '2023-01-05T00:58:07.402722+01:00',
                        updated_at: '2023-01-05T00:58:07.402722+01:00',
                        customer: null,
                        source: {
                          bank_name: '',
                          bank_code: '',
                          account_name: '',
                          account_number: '',
                        },
                        ledger: {
                          transaction_id:
                            'b9b82bee-ad70-4624-95a3-642daad93ba7',
                          wallet_id: 'fe5fd272-a280-4815-a848-360df8fb6c19',
                          debit: 300,
                          credit: 0,
                          previous_balance: 98901,
                          current_balance: 9898200,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                          created_at: '2023-01-05T00:58:07.422524+01:00',
                          updated_at: '2023-01-05T00:58:07.422524+01:00',
                        },
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Fetched transaction',
                    data: {
                      id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                      status: 'SUCCESS',
                      entry: 'DEBIT',
                      type: 'CARD',
                      amount: 300,
                      fee: 100,
                      currency: 'USD',
                      channel: 'CARD',
                      summary: 'Card Issuance & Funding',
                      reason: null,
                      reference: null,
                      account_id: null,
                      created_at: '2023-01-05T00:58:07.402722+01:00',
                      updated_at: '2023-01-05T00:58:07.402722+01:00',
                      customer: null,
                      source: {
                        bank_name: '',
                        bank_code: '',
                        account_name: '',
                        account_number: '',
                      },
                      ledger: {
                        transaction_id: 'b9b82bee-ad70-4624-95a3-642daad93ba7',
                        wallet_id: 'fe5fd272-a280-4815-a848-360df8fb6c19',
                        debit: 300,
                        credit: 0,
                        previous_balance: 98901,
                        current_balance: 9898200,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                        created_at: '2023-01-05T00:58:07.422524+01:00',
                        updated_at: '2023-01-05T00:58:07.422524+01:00',
                      },
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Fetched transaction',
                  data: {
                    id: '5384bd4d-ed13-4fd6-b356-37f390d8323b',
                    status: 'SUCCESS',
                    entry: 'DEBIT',
                    type: 'CARD',
                    amount: 300,
                    fee: 100,
                    currency: 'USD',
                    channel: 'CARD',
                    summary: 'Card Issuance & Funding',
                    reason: null,
                    reference: null,
                    account_id: null,
                    created_at: '2023-01-05T00:58:07.402722+01:00',
                    updated_at: '2023-01-05T00:58:07.402722+01:00',
                    customer: null,
                    source: {
                      bank_name: '',
                      bank_code: '',
                      account_name: '',
                      account_number: '',
                    },
                    ledger: {
                      transaction_id: 'b9b82bee-ad70-4624-95a3-642daad93ba7',
                      wallet_id: 'fe5fd272-a280-4815-a848-360df8fb6c19',
                      debit: 300,
                      credit: 0,
                      previous_balance: 98901,
                      current_balance: 9898200,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                      created_at: '2023-01-05T00:58:07.422524+01:00',
                      updated_at: '2023-01-05T00:58:07.422524+01:00',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/fx/quote': {
      post: {
        summary: 'Generate FX quote',
        description:
          'This resource generates a foreign exchange quote. Generating a quote is the first step to processing a currency exchange',
        operationId: 'postV1FxQuote',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  source_currency: {
                    type: 'string',
                    description:
                      'This signifies the currency that will be exchanged from',
                    default: 'NGN',
                  },
                  target_currency: {
                    type: 'string',
                    description: 'The currency that will be exchanged to',
                    default: 'USD',
                  },
                  amount: {
                    type: 'integer',
                    description:
                      'The amount in the lowest denomination of the source currency',
                    default: '10000',
                  },
                },
                required: ['source_currency', 'target_currency', 'amount'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: '201',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Quote generated successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        reference: {
                          type: 'string',
                          example: 'cdb3df604f7e448ca6d9cafa11b39be2',
                        },
                        source: {
                          type: 'object',
                          properties: {
                            currency: {
                              type: 'string',
                              example: 'NGN',
                            },
                            amount: {
                              type: 'integer',
                              example: 10000,
                            },
                            human_readable_amount: {
                              type: 'integer',
                              example: 100,
                            },
                          },
                          example: {
                            currency: 'NGN',
                            amount: 10000,
                            human_readable_amount: 100,
                          },
                        },
                        target: {
                          type: 'object',
                          properties: {
                            currency: {
                              type: 'string',
                              example: 'USD',
                            },
                            amount: {
                              type: 'integer',
                              example: 15,
                            },
                            human_readable_amount: {
                              type: 'number',
                              example: 0.15,
                            },
                          },
                          example: {
                            currency: 'USD',
                            amount: 15,
                            human_readable_amount: 0.15,
                          },
                        },
                        rate: {
                          type: 'number',
                          example: 0.00158730158,
                        },
                      },
                      example: {
                        reference: 'cdb3df604f7e448ca6d9cafa11b39be2',
                        source: {
                          currency: 'NGN',
                          amount: 10000,
                          human_readable_amount: 100,
                        },
                        target: {
                          currency: 'USD',
                          amount: 15,
                          human_readable_amount: 0.15,
                        },
                        rate: 0.00158730158,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Quote generated successfully',
                    data: {
                      reference: 'cdb3df604f7e448ca6d9cafa11b39be2',
                      source: {
                        currency: 'NGN',
                        amount: 10000,
                        human_readable_amount: 100,
                      },
                      target: {
                        currency: 'USD',
                        amount: 15,
                        human_readable_amount: 0.15,
                      },
                      rate: 0.00158730158,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Quote generated successfully',
                  data: {
                    reference: 'cdb3df604f7e448ca6d9cafa11b39be2',
                    source: {
                      currency: 'NGN',
                      amount: 10000,
                      human_readable_amount: 100,
                    },
                    target: {
                      currency: 'USD',
                      amount: 15,
                      human_readable_amount: 0.15,
                    },
                    rate: 0.00158730158,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/fx': {
      post: {
        summary: 'Exchange Currency',
        description: 'This resource processes the currency exchange.',
        operationId: 'postV1Fx',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  quote_reference: {
                    type: 'string',
                    description: 'The reference id of the quote to process.',
                    default: '3b671cff0bcd41608897f5196d331a3f',
                  },
                },
                required: ['quote_reference'],
              },
            },
          },
        },
        responses: {
          '201': {
            description: '201',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Exchange successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        source: {
                          type: 'object',
                          properties: {
                            currency: {
                              type: 'string',
                              example: 'USD',
                            },
                            amount: {
                              type: 'integer',
                              example: 10000,
                            },
                            human_readable_amount: {
                              type: 'integer',
                              example: 100,
                            },
                          },
                          example: {
                            currency: 'USD',
                            amount: 10000,
                            human_readable_amount: 100,
                          },
                        },
                        target: {
                          type: 'object',
                          properties: {
                            currency: {
                              type: 'string',
                              example: 'NGN',
                            },
                            amount: {
                              type: 'integer',
                              example: 6000000,
                            },
                            human_readable_amount: {
                              type: 'integer',
                              example: 60000,
                            },
                          },
                          example: {
                            currency: 'NGN',
                            amount: 6000000,
                            human_readable_amount: 60000,
                          },
                        },
                        rate: {
                          type: 'integer',
                          example: 600,
                        },
                      },
                      example: {
                        source: {
                          currency: 'USD',
                          amount: 10000,
                          human_readable_amount: 100,
                        },
                        target: {
                          currency: 'NGN',
                          amount: 6000000,
                          human_readable_amount: 60000,
                        },
                        rate: 600,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Exchange successful',
                    data: {
                      source: {
                        currency: 'USD',
                        amount: 10000,
                        human_readable_amount: 100,
                      },
                      target: {
                        currency: 'NGN',
                        amount: 6000000,
                        human_readable_amount: 60000,
                      },
                      rate: 600,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Exchange successful',
                  data: {
                    source: {
                      currency: 'USD',
                      amount: 10000,
                      human_readable_amount: 100,
                    },
                    target: {
                      currency: 'NGN',
                      amount: 6000000,
                      human_readable_amount: 60000,
                    },
                    rate: 600,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
      get: {
        summary: 'Get FX History',
        description:
          'This resource returns a list of all FX transactions processed.',
        operationId: 'getV1Fx',
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/identity/bvn': {
      post: {
        summary: 'Verify BVN',
        description:
          'This resource checks for the validity of a BVN and returns its details.',
        operationId: 'postV1IdentityBvn',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  bvn: {
                    type: 'string',
                    description: 'Bank Verification Number of individual',
                    default: '01234567890',
                  },
                },
                required: ['bvn'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'BVN verified successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        first_name: {
                          type: 'string',
                          example: 'John',
                        },
                        last_name: {
                          type: 'string',
                          example: 'Doe',
                        },
                        middle_name: {
                          type: 'string',
                          example: 'Victor',
                        },
                        gender: {
                          type: 'string',
                          example: 'Male',
                        },
                        dob: {
                          type: 'string',
                          example: '1964-01-10',
                        },
                        phone_number: {
                          type: 'string',
                          example: '08000000000',
                        },
                        image: {
                          type: 'string',
                          example:
                            'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
                        },
                      },
                      example: {
                        first_name: 'John',
                        last_name: 'Doe',
                        middle_name: 'Victor',
                        gender: 'Male',
                        dob: '1964-01-10',
                        phone_number: '08000000000',
                        image:
                          'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'BVN verified successfully',
                    data: {
                      first_name: 'John',
                      last_name: 'Doe',
                      middle_name: 'Victor',
                      gender: 'Male',
                      dob: '1964-01-10',
                      phone_number: '08000000000',
                      image:
                        'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'BVN verified successfully',
                  data: {
                    first_name: 'John',
                    last_name: 'Doe',
                    middle_name: 'Victor',
                    gender: 'Male',
                    dob: '1964-01-10',
                    phone_number: '08000000000',
                    image:
                      'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAADMElEQVR4nOzVwQnAIBQFQYXff81RUkQCOyDj1YOPnbXWPmeTRef+/3O/OyBjzh3CD95BfqICMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMK0CMO0TAAD//2Anhf4QtqobAAAAAElFTkSuQmCC',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/institutions': {
      get: {
        summary: 'Get all Institutions',
        description:
          'This resource returns a list of all institutions by type and country.',
        operationId: 'getV1Institutions',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            description: 'The page number',
            schema: {
              type: 'string',
              description: 'The page number',
              default: '1',
            },
            example: '1',
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            description: 'The number of items to return',
            schema: {
              type: 'string',
              description: 'The number of items to return',
              default: '10',
            },
            example: '10',
          },
          {
            name: 'country',
            in: 'query',
            required: false,
            description:
              'The country ISO code. Find available countries here: https://maplerad.dev/reference/get-all-countries',
            schema: {
              type: 'string',
              description:
                'The country ISO code. Find available countries here: https://maplerad.dev/reference/get-all-countries',
              default: 'NG',
            },
            example: 'NG',
          },
          {
            name: 'type',
            in: 'query',
            required: false,
            description:
              'The type of method which you need an institution for. VIRTUAL is for creating virtual accounts, NUBAN is used for sending money to a NGN Bank account, BOG is used for sending money to a GHS Bank account, CBK is used for sending money to a KES Bank account.',
            schema: {
              type: 'string',
              description:
                'The type of method which you need an institution for. VIRTUAL is for creating virtual accounts, NUBAN is used for sending money to a NGN Bank account, BOG is used for sending money to a GHS Bank account, CBK is used for sending money to a KES Bank account.',
              default: 'NUBAN',
            },
            example: 'NUBAN',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Banks fetched successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'Access Bank',
                          },
                          code: {
                            type: 'string',
                            example: '044',
                          },
                        },
                        example: {
                          name: 'Access Bank',
                          code: '044',
                        },
                      },
                      example: [
                        {
                          name: 'Access Bank',
                          code: '044',
                        },
                      ],
                    },
                    page: {
                      type: 'integer',
                      example: 0,
                    },
                    page_size: {
                      type: 'integer',
                      example: 0,
                    },
                    total: {
                      type: 'integer',
                      example: 0,
                    },
                  },
                  example: {
                    status: true,
                    message: 'Banks fetched successfully',
                    data: [
                      {
                        name: 'Access Bank',
                        code: '044',
                      },
                    ],
                    page: 0,
                    page_size: 0,
                    total: 0,
                  },
                },
                example: {
                  status: true,
                  message: 'Banks fetched successfully',
                  data: [
                    {
                      name: 'Access Bank',
                      code: '044',
                    },
                  ],
                  page: 0,
                  page_size: 0,
                  total: 0,
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/institutions/fetch': {
      post: {
        summary: 'Fetch Bank Details',
        description:
          'This resource fetches additional details of an institution from a routing number.',
        operationId: 'postV1InstitutionsFetch',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  routing_number: {
                    type: 'string',
                    default: '051402372',
                  },
                  country_code: {
                    type: 'string',
                    description: 'ISO code of the institution.',
                    default: 'US',
                  },
                },
                required: ['routing_number', 'country_code'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'successfully',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        routing_number: {
                          type: 'string',
                          example: '051402372',
                        },
                        institution_name: {
                          type: 'string',
                          example: 'BLUE RIDGE BANK, NA',
                        },
                        address: {
                          type: 'object',
                          properties: {
                            address: {
                              type: 'string',
                              example: '17 WEST MAIN ST LURAY',
                            },
                            state: {
                              type: 'string',
                              example: 'VA',
                            },
                            zip_code: {
                              type: 'string',
                              example: '22835',
                            },
                          },
                          example: {
                            address: '17 WEST MAIN ST LURAY',
                            state: 'VA',
                            zip_code: '22835',
                          },
                        },
                        phone_number: {
                          type: 'string',
                          example: '5407436521',
                        },
                      },
                      example: {
                        routing_number: '051402372',
                        institution_name: 'BLUE RIDGE BANK, NA',
                        address: {
                          address: '17 WEST MAIN ST LURAY',
                          state: 'VA',
                          zip_code: '22835',
                        },
                        phone_number: '5407436521',
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'successfully',
                    data: {
                      routing_number: '051402372',
                      institution_name: 'BLUE RIDGE BANK, NA',
                      address: {
                        address: '17 WEST MAIN ST LURAY',
                        state: 'VA',
                        zip_code: '22835',
                      },
                      phone_number: '5407436521',
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'successfully',
                  data: {
                    routing_number: '051402372',
                    institution_name: 'BLUE RIDGE BANK, NA',
                    address: {
                      address: '17 WEST MAIN ST LURAY',
                      state: 'VA',
                      zip_code: '22835',
                    },
                    phone_number: '5407436521',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/institutions/resolve': {
      post: {
        summary: 'Resolve Institution Account',
        description:
          'Use this resource to confirm an account. Testing on Sandbox gives a dummy response. To get actual values change to Live.',
        operationId: 'postV1InstitutionsResolve',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  account_number: {
                    type: 'string',
                    default: '2328990453',
                  },
                  bank_code: {
                    type: 'string',
                    default: '043',
                  },
                },
                required: ['account_number', 'bank_code'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'string',
                    },
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        account_name: {
                          type: 'string',
                          example: 'string',
                        },
                        account_number: {
                          type: 'string',
                          example: 'string',
                        },
                      },
                      example: {
                        account_name: 'string',
                        account_number: 'string',
                      },
                    },
                  },
                  example: {
                    message: 'string',
                    status: true,
                    data: {
                      account_name: 'string',
                      account_number: 'string',
                    },
                  },
                },
                example: {
                  message: 'string',
                  status: true,
                  data: {
                    account_name: 'string',
                    account_number: 'string',
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/currencies': {
      get: {
        summary: 'Get all Currencies',
        description: 'This resource provides a list of all currencies',
        operationId: 'getV1Currencies',
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Success',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'Nigerian Naira',
                          },
                          currency: {
                            type: 'string',
                            example: 'NGN',
                          },
                          symbol: {
                            type: 'string',
                            example: '₦',
                          },
                        },
                        example: {
                          name: 'Nigerian Naira',
                          currency: 'NGN',
                          symbol: '₦',
                        },
                      },
                      example: [
                        {
                          name: 'Nigerian Naira',
                          currency: 'NGN',
                          symbol: '₦',
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Success',
                    data: [
                      {
                        name: 'Nigerian Naira',
                        currency: 'NGN',
                        symbol: '₦',
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Success',
                  data: [
                    {
                      name: 'Nigerian Naira',
                      currency: 'NGN',
                      symbol: '₦',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/countries': {
      get: {
        summary: 'Get all Countries',
        description:
          'This resources returns a list of all countries (allowed on Maplerad) and information about them.',
        operationId: 'getV1Countries',
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Success',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            example: 'Nigeria',
                          },
                          code: {
                            type: 'string',
                            example: 'NG',
                          },
                          calling_code: {
                            type: 'string',
                            example: '234',
                          },
                        },
                        example: {
                          name: 'Nigeria',
                          code: 'NG',
                          calling_code: '234',
                        },
                      },
                      example: [
                        {
                          name: 'Nigeria',
                          code: 'NG',
                          calling_code: '234',
                        },
                        {
                          name: 'Ghana',
                          code: 'GH',
                          calling_code: '233',
                        },
                        {
                          name: 'Kenya',
                          code: 'KE',
                          calling_code: '254',
                        },
                        {
                          name: 'Cameroon',
                          code: 'CM',
                          calling_code: '237',
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Success',
                    data: [
                      {
                        name: 'Nigeria',
                        code: 'NG',
                        calling_code: '234',
                      },
                      {
                        name: 'Ghana',
                        code: 'GH',
                        calling_code: '233',
                      },
                      {
                        name: 'Kenya',
                        code: 'KE',
                        calling_code: '254',
                      },
                      {
                        name: 'Cameroon',
                        code: 'CM',
                        calling_code: '237',
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Success',
                  data: [
                    {
                      name: 'Nigeria',
                      code: 'NG',
                      calling_code: '234',
                    },
                    {
                      name: 'Ghana',
                      code: 'GH',
                      calling_code: '233',
                    },
                    {
                      name: 'Kenya',
                      code: 'KE',
                      calling_code: '254',
                    },
                    {
                      name: 'Cameroon',
                      code: 'CM',
                      calling_code: '237',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/wallets': {
      get: {
        summary: 'Get Wallets',
        description:
          'This resource returns details about your business account.',
        operationId: 'getV1Wallets',
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Wallet has been retrieved successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          },
                          currency: {
                            type: 'string',
                            example: 'NGN',
                          },
                          ledger_balance: {
                            type: 'integer',
                            example: 200,
                          },
                          available_balance: {
                            type: 'integer',
                            example: 92042023,
                          },
                          holding_balance: {
                            type: 'integer',
                            example: 0,
                          },
                          active: {
                            type: 'boolean',
                            example: true,
                          },
                          disabled: {
                            type: 'boolean',
                            example: false,
                          },
                          wallet_type: {
                            type: 'string',
                            example: 'DEFAULT',
                          },
                        },
                        example: {
                          id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          currency: 'NGN',
                          ledger_balance: 200,
                          available_balance: 92042023,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                      },
                      example: [
                        {
                          id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          currency: 'NGN',
                          ledger_balance: 200,
                          available_balance: 92042023,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '1e676aba-c3ae-440b-8c72-2b2522305dc8',
                          currency: 'GHS',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '3bc473c6-af33-4f01-9832-1dc8a15316a6',
                          currency: 'KES',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          currency: 'USD',
                          ledger_balance: 0,
                          available_balance: 999994500,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'a4ff59c6-371d-4579-a964-62e949a1280f',
                          currency: 'CAD',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '2269d52b-3121-4004-98a2-10f636563a3f',
                          currency: 'GBP',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'aaa471cb-ffdd-4740-be1e-652c565873be',
                          currency: 'EUR',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'b51d0658-4817-49bc-961b-0c8a77018e71',
                          currency: 'XAF',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '8a3f20ec-c19a-4838-917c-cc249c7e215c',
                          currency: 'XOF',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '13589f8c-3f20-44fb-a8ec-3659d7543825',
                          currency: 'ZAR',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'da7df01b-6529-4fa8-812d-9c5d43d10667',
                          currency: 'UGX',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '0bd5fc43-9b23-4f0f-b2e3-ad32249eec8a',
                          currency: 'RWF',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'd762c9e9-9996-4369-8e1d-077e581545e2',
                          currency: 'AED',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '90ebe940-0cfc-4ae2-9f0e-90cea7c57138',
                          currency: 'CNY',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'eec5e3ef-d0e4-440f-8844-3e7986463b3d',
                          currency: 'EGP',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: 'bc4b0e46-59b5-4679-970a-4e7e501b2b31',
                          currency: 'TZS',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '54e29660-2d09-4970-aab2-330a168f7a9d',
                          currency: 'ZMW',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '4d8a984f-c56d-4639-8c3a-c3c43741cd1f',
                          currency: 'USDC',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                        {
                          id: '6958ce67-5036-4469-9d58-fae744978260',
                          currency: 'BTC',
                          ledger_balance: 0,
                          available_balance: 0,
                          holding_balance: 0,
                          active: true,
                          disabled: false,
                          wallet_type: 'DEFAULT',
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Wallet has been retrieved successfully',
                    data: [
                      {
                        id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                        currency: 'NGN',
                        ledger_balance: 200,
                        available_balance: 92042023,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '1e676aba-c3ae-440b-8c72-2b2522305dc8',
                        currency: 'GHS',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '3bc473c6-af33-4f01-9832-1dc8a15316a6',
                        currency: 'KES',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        currency: 'USD',
                        ledger_balance: 0,
                        available_balance: 999994500,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'a4ff59c6-371d-4579-a964-62e949a1280f',
                        currency: 'CAD',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '2269d52b-3121-4004-98a2-10f636563a3f',
                        currency: 'GBP',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'aaa471cb-ffdd-4740-be1e-652c565873be',
                        currency: 'EUR',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'b51d0658-4817-49bc-961b-0c8a77018e71',
                        currency: 'XAF',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '8a3f20ec-c19a-4838-917c-cc249c7e215c',
                        currency: 'XOF',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '13589f8c-3f20-44fb-a8ec-3659d7543825',
                        currency: 'ZAR',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'da7df01b-6529-4fa8-812d-9c5d43d10667',
                        currency: 'UGX',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '0bd5fc43-9b23-4f0f-b2e3-ad32249eec8a',
                        currency: 'RWF',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'd762c9e9-9996-4369-8e1d-077e581545e2',
                        currency: 'AED',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '90ebe940-0cfc-4ae2-9f0e-90cea7c57138',
                        currency: 'CNY',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'eec5e3ef-d0e4-440f-8844-3e7986463b3d',
                        currency: 'EGP',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: 'bc4b0e46-59b5-4679-970a-4e7e501b2b31',
                        currency: 'TZS',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '54e29660-2d09-4970-aab2-330a168f7a9d',
                        currency: 'ZMW',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '4d8a984f-c56d-4639-8c3a-c3c43741cd1f',
                        currency: 'USDC',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                      {
                        id: '6958ce67-5036-4469-9d58-fae744978260',
                        currency: 'BTC',
                        ledger_balance: 0,
                        available_balance: 0,
                        holding_balance: 0,
                        active: true,
                        disabled: false,
                        wallet_type: 'DEFAULT',
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Wallet has been retrieved successfully',
                  data: [
                    {
                      id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                      currency: 'NGN',
                      ledger_balance: 200,
                      available_balance: 92042023,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '1e676aba-c3ae-440b-8c72-2b2522305dc8',
                      currency: 'GHS',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '3bc473c6-af33-4f01-9832-1dc8a15316a6',
                      currency: 'KES',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      currency: 'USD',
                      ledger_balance: 0,
                      available_balance: 999994500,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'a4ff59c6-371d-4579-a964-62e949a1280f',
                      currency: 'CAD',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '2269d52b-3121-4004-98a2-10f636563a3f',
                      currency: 'GBP',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'aaa471cb-ffdd-4740-be1e-652c565873be',
                      currency: 'EUR',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'b51d0658-4817-49bc-961b-0c8a77018e71',
                      currency: 'XAF',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '8a3f20ec-c19a-4838-917c-cc249c7e215c',
                      currency: 'XOF',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '13589f8c-3f20-44fb-a8ec-3659d7543825',
                      currency: 'ZAR',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'da7df01b-6529-4fa8-812d-9c5d43d10667',
                      currency: 'UGX',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '0bd5fc43-9b23-4f0f-b2e3-ad32249eec8a',
                      currency: 'RWF',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'd762c9e9-9996-4369-8e1d-077e581545e2',
                      currency: 'AED',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '90ebe940-0cfc-4ae2-9f0e-90cea7c57138',
                      currency: 'CNY',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'eec5e3ef-d0e4-440f-8844-3e7986463b3d',
                      currency: 'EGP',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: 'bc4b0e46-59b5-4679-970a-4e7e501b2b31',
                      currency: 'TZS',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '54e29660-2d09-4970-aab2-330a168f7a9d',
                      currency: 'ZMW',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '4d8a984f-c56d-4639-8c3a-c3c43741cd1f',
                      currency: 'USDC',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                    {
                      id: '6958ce67-5036-4469-9d58-fae744978260',
                      currency: 'BTC',
                      ledger_balance: 0,
                      available_balance: 0,
                      holding_balance: 0,
                      active: true,
                      disabled: false,
                      wallet_type: 'DEFAULT',
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/wallets/history': {
      get: {
        summary: 'Get Wallets History',
        description:
          'This resource returns the history of transactions in a wallet.',
        operationId: 'getV1WalletsHistory',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '1',
            },
            example: '1',
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            schema: {
              type: 'string',
              default: '10',
            },
            example: '10',
          },
          {
            name: 'start_date',
            in: 'query',
            required: false,
            description:
              'Return transactions created after and on this date. YYYY-MM-DD',
            schema: {
              type: 'string',
              description:
                'Return transactions created after and on this date. YYYY-MM-DD',
              default: '2023-01-02',
            },
            example: '2023-01-02',
          },
          {
            name: 'end_date',
            in: 'query',
            required: false,
            description:
              'Return transactions created before and on this date. YYYY-MM-DD',
            schema: {
              type: 'string',
              description:
                'Return transactions created before and on this date. YYYY-MM-DD',
              default: '2023-01-09',
            },
            example: '2023-01-09',
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          transaction_id: {
                            type: 'string',
                            example: '7faacc87-d647-49c1-a132-348ccc6d0c2a',
                          },
                          related_transaction_id: {},
                          wallet_id: {
                            type: 'string',
                            example: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          },
                          debit: {
                            type: 'integer',
                            example: 5000,
                          },
                          credit: {
                            type: 'integer',
                            example: 0,
                          },
                          previous_balance: {
                            type: 'integer',
                            example: 1000000000,
                          },
                          current_balance: {
                            type: 'integer',
                            example: 999995000,
                          },
                          balance_type: {
                            type: 'string',
                            example: 'AVAILABLE',
                          },
                          reversal: {
                            type: 'boolean',
                            example: false,
                          },
                        },
                        example: {
                          transaction_id:
                            '7faacc87-d647-49c1-a132-348ccc6d0c2a',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 5000,
                          credit: 0,
                          previous_balance: 1000000000,
                          current_balance: 999995000,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                      },
                      example: [
                        {
                          transaction_id:
                            '7faacc87-d647-49c1-a132-348ccc6d0c2a',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 5000,
                          credit: 0,
                          previous_balance: 1000000000,
                          current_balance: 999995000,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            'c462752b-27e1-457d-9d56-5a80942e62ba',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 100,
                          credit: 0,
                          previous_balance: 999995000,
                          current_balance: 999994900,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            'a17e73af-4ad7-451f-9d12-9a73a28790dd',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 100,
                          credit: 0,
                          previous_balance: 999994900,
                          current_balance: 999994800,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '5f8ac113-16a1-4fdf-9767-d2a590217b78',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 100,
                          credit: 0,
                          previous_balance: 999994800,
                          current_balance: 999994700,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '7e2e7a2a-ec71-4397-a33c-1bcac826a13f',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 100,
                          credit: 0,
                          previous_balance: 999994700,
                          current_balance: 999994600,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '369722b2-0c6f-4542-b21d-0fdb24e54b6c',
                          related_transaction_id: null,
                          wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                          debit: 100,
                          credit: 0,
                          previous_balance: 999994600,
                          current_balance: 999994500,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '8c103a0c-fd3f-4908-a890-eba0af130a84',
                          related_transaction_id: null,
                          wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          debit: 20200,
                          credit: 0,
                          previous_balance: 92082823,
                          current_balance: 92062623,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '45c2f309-c7b1-4e33-a1e7-74b3337e9c12',
                          related_transaction_id: null,
                          wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          debit: 20200,
                          credit: 0,
                          previous_balance: 92062623,
                          current_balance: 92042423,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '5f02da87-a3b8-4106-8e0d-b645c278acac',
                          related_transaction_id: null,
                          wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          debit: 20200,
                          credit: 0,
                          previous_balance: 92042423,
                          current_balance: 92022223,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                        {
                          transaction_id:
                            '889127f7-2455-4e87-afe8-6fe46fef9685',
                          related_transaction_id: null,
                          wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                          debit: 0,
                          credit: 19800,
                          previous_balance: 92022223,
                          current_balance: 92042023,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                        },
                      ],
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully',
                    data: [
                      {
                        transaction_id: '7faacc87-d647-49c1-a132-348ccc6d0c2a',
                        related_transaction_id: null,
                        wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        debit: 5000,
                        credit: 0,
                        previous_balance: 1000000000,
                        current_balance: 999995000,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: 'c462752b-27e1-457d-9d56-5a80942e62ba',
                        related_transaction_id: null,
                        wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        debit: 100,
                        credit: 0,
                        previous_balance: 999995000,
                        current_balance: 999994900,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: 'a17e73af-4ad7-451f-9d12-9a73a28790dd',
                        related_transaction_id: null,
                        wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        debit: 100,
                        credit: 0,
                        previous_balance: 999994900,
                        current_balance: 999994800,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '5f8ac113-16a1-4fdf-9767-d2a590217b78',
                        related_transaction_id: null,
                        wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        debit: 100,
                        credit: 0,
                        previous_balance: 999994800,
                        current_balance: 999994700,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '7e2e7a2a-ec71-4397-a33c-1bcac826a13f',
                        related_transaction_id: null,
                        wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        debit: 100,
                        credit: 0,
                        previous_balance: 999994700,
                        current_balance: 999994600,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '369722b2-0c6f-4542-b21d-0fdb24e54b6c',
                        related_transaction_id: null,
                        wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                        debit: 100,
                        credit: 0,
                        previous_balance: 999994600,
                        current_balance: 999994500,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '8c103a0c-fd3f-4908-a890-eba0af130a84',
                        related_transaction_id: null,
                        wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                        debit: 20200,
                        credit: 0,
                        previous_balance: 92082823,
                        current_balance: 92062623,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '45c2f309-c7b1-4e33-a1e7-74b3337e9c12',
                        related_transaction_id: null,
                        wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                        debit: 20200,
                        credit: 0,
                        previous_balance: 92062623,
                        current_balance: 92042423,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '5f02da87-a3b8-4106-8e0d-b645c278acac',
                        related_transaction_id: null,
                        wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                        debit: 20200,
                        credit: 0,
                        previous_balance: 92042423,
                        current_balance: 92022223,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                      {
                        transaction_id: '889127f7-2455-4e87-afe8-6fe46fef9685',
                        related_transaction_id: null,
                        wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                        debit: 0,
                        credit: 19800,
                        previous_balance: 92022223,
                        current_balance: 92042023,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                      },
                    ],
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully',
                  data: [
                    {
                      transaction_id: '7faacc87-d647-49c1-a132-348ccc6d0c2a',
                      related_transaction_id: null,
                      wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      debit: 5000,
                      credit: 0,
                      previous_balance: 1000000000,
                      current_balance: 999995000,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: 'c462752b-27e1-457d-9d56-5a80942e62ba',
                      related_transaction_id: null,
                      wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      debit: 100,
                      credit: 0,
                      previous_balance: 999995000,
                      current_balance: 999994900,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: 'a17e73af-4ad7-451f-9d12-9a73a28790dd',
                      related_transaction_id: null,
                      wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      debit: 100,
                      credit: 0,
                      previous_balance: 999994900,
                      current_balance: 999994800,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '5f8ac113-16a1-4fdf-9767-d2a590217b78',
                      related_transaction_id: null,
                      wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      debit: 100,
                      credit: 0,
                      previous_balance: 999994800,
                      current_balance: 999994700,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '7e2e7a2a-ec71-4397-a33c-1bcac826a13f',
                      related_transaction_id: null,
                      wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      debit: 100,
                      credit: 0,
                      previous_balance: 999994700,
                      current_balance: 999994600,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '369722b2-0c6f-4542-b21d-0fdb24e54b6c',
                      related_transaction_id: null,
                      wallet_id: 'd6227a03-acf0-4c70-b84f-7b5f627c43dc',
                      debit: 100,
                      credit: 0,
                      previous_balance: 999994600,
                      current_balance: 999994500,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '8c103a0c-fd3f-4908-a890-eba0af130a84',
                      related_transaction_id: null,
                      wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                      debit: 20200,
                      credit: 0,
                      previous_balance: 92082823,
                      current_balance: 92062623,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '45c2f309-c7b1-4e33-a1e7-74b3337e9c12',
                      related_transaction_id: null,
                      wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                      debit: 20200,
                      credit: 0,
                      previous_balance: 92062623,
                      current_balance: 92042423,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '5f02da87-a3b8-4106-8e0d-b645c278acac',
                      related_transaction_id: null,
                      wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                      debit: 20200,
                      credit: 0,
                      previous_balance: 92042423,
                      current_balance: 92022223,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                    {
                      transaction_id: '889127f7-2455-4e87-afe8-6fe46fef9685',
                      related_transaction_id: null,
                      wallet_id: 'f554bbe0-afb7-4a7b-b15c-2dd8ed9c6a9b',
                      debit: 0,
                      credit: 19800,
                      previous_balance: 92022223,
                      current_balance: 92042023,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                    },
                  ],
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/wallets/{currency_code}/history': {
      get: {
        summary: 'Get Wallets History by Currency',
        description:
          'This resource returns wallet history sorted by the currency code.',
        operationId: 'getV1WalletsCurrencyCodeHistory',
        parameters: [
          {
            name: 'currency_code',
            in: 'path',
            required: true,
            description: 'e.g NGN for Naira, USD for dollars',
            schema: {
              type: 'string',
              description: 'e.g NGN for Naira, USD for dollars',
              default: 'NGN',
            },
            example: 'NGN',
          },
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: '1',
            },
            example: 1,
          },
          {
            name: 'page_size',
            in: 'query',
            required: false,
            schema: {
              type: 'integer',
              default: '10',
            },
            example: 10,
          },
          {
            name: 'start_date',
            in: 'query',
            required: false,
            description:
              'Return transactions created after and on this date. YYYY-MM-DD',
            schema: {
              type: 'string',
              description:
                'Return transactions created after and on this date. YYYY-MM-DD',
            },
          },
          {
            name: 'end_date',
            in: 'query',
            required: false,
            description:
              'Return transactions created before and on this date. YYYY-MM-DD',
            schema: {
              type: 'string',
              description:
                'Return transactions created before and on this date. YYYY-MM-DD',
            },
          },
        ],
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully',
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          transaction_id: {
                            type: 'string',
                            example: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                          },
                          related_transaction_id: {},
                          wallet_id: {
                            type: 'string',
                            example: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                          },
                          debit: {
                            type: 'integer',
                            example: 55000,
                          },
                          credit: {
                            type: 'integer',
                            example: 0,
                          },
                          previous_balance: {
                            type: 'integer',
                            example: 500000000000,
                          },
                          current_balance: {
                            type: 'integer',
                            example: 499999945000,
                          },
                          balance_type: {
                            type: 'string',
                            example: 'AVAILABLE',
                          },
                          reversal: {
                            type: 'boolean',
                            example: false,
                          },
                          transaction: {
                            type: 'object',
                            properties: {
                              id: {
                                type: 'string',
                                example: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                              },
                              status: {
                                type: 'string',
                                example: 'SUCCESS',
                              },
                              amount: {
                                type: 'integer',
                                example: 55000,
                              },
                              fee: {
                                type: 'integer',
                                example: 0,
                              },
                              currency: {
                                type: 'string',
                                example: 'NGN',
                              },
                              channel: {
                                type: 'string',
                                example: 'WALLET',
                              },
                              summary: {
                                type: 'string',
                                example: '',
                              },
                            },
                            example: {
                              id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                              status: 'SUCCESS',
                              amount: 55000,
                              fee: 0,
                              currency: 'NGN',
                              channel: 'WALLET',
                              summary: '',
                            },
                          },
                          created_at: {
                            type: 'string',
                            example: '2022-08-22T09:12:58.945497+01:00',
                          },
                          updated_at: {
                            type: 'string',
                            example: '2022-08-22T09:12:58.945497+01:00',
                          },
                        },
                        example: {
                          transaction_id:
                            'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                          related_transaction_id: null,
                          wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                          debit: 55000,
                          credit: 0,
                          previous_balance: 500000000000,
                          current_balance: 499999945000,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                          transaction: {
                            id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                            status: 'SUCCESS',
                            amount: 55000,
                            fee: 0,
                            currency: 'NGN',
                            channel: 'WALLET',
                            summary: '',
                          },
                          created_at: '2022-08-22T09:12:58.945497+01:00',
                          updated_at: '2022-08-22T09:12:58.945497+01:00',
                        },
                      },
                      example: [
                        {
                          transaction_id:
                            'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                          related_transaction_id: null,
                          wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                          debit: 55000,
                          credit: 0,
                          previous_balance: 500000000000,
                          current_balance: 499999945000,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                          transaction: {
                            id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                            status: 'SUCCESS',
                            amount: 55000,
                            fee: 0,
                            currency: 'NGN',
                            channel: 'WALLET',
                            summary: '',
                          },
                          created_at: '2022-08-22T09:12:58.945497+01:00',
                          updated_at: '2022-08-22T09:12:58.945497+01:00',
                        },
                        {
                          transaction_id:
                            'df82f1c4-6fad-45b8-a357-1f7d50b3b039',
                          related_transaction_id: null,
                          wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                          debit: 55000,
                          credit: 0,
                          previous_balance: 499999945000,
                          current_balance: 499999890000,
                          balance_type: 'AVAILABLE',
                          reversal: false,
                          transaction: {
                            id: 'df82f1c4-6fad-45b8-a357-1f7d50b3b039',
                            status: 'SUCCESS',
                            amount: 55000,
                            fee: 0,
                            currency: 'NGN',
                            channel: 'WALLET',
                            summary: '',
                          },
                          created_at: '2022-08-22T09:14:24.767934+01:00',
                          updated_at: '2022-08-22T09:14:24.767934+01:00',
                        },
                      ],
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: {
                          type: 'integer',
                          example: 1,
                        },
                        page_size: {
                          type: 'integer',
                          example: 2,
                        },
                        total: {
                          type: 'integer',
                          example: 26,
                        },
                      },
                      example: {
                        page: 1,
                        page_size: 2,
                        total: 26,
                      },
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully',
                    data: [
                      {
                        transaction_id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                        related_transaction_id: null,
                        wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                        debit: 55000,
                        credit: 0,
                        previous_balance: 500000000000,
                        current_balance: 499999945000,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                        transaction: {
                          id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                          status: 'SUCCESS',
                          amount: 55000,
                          fee: 0,
                          currency: 'NGN',
                          channel: 'WALLET',
                          summary: '',
                        },
                        created_at: '2022-08-22T09:12:58.945497+01:00',
                        updated_at: '2022-08-22T09:12:58.945497+01:00',
                      },
                      {
                        transaction_id: 'df82f1c4-6fad-45b8-a357-1f7d50b3b039',
                        related_transaction_id: null,
                        wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                        debit: 55000,
                        credit: 0,
                        previous_balance: 499999945000,
                        current_balance: 499999890000,
                        balance_type: 'AVAILABLE',
                        reversal: false,
                        transaction: {
                          id: 'df82f1c4-6fad-45b8-a357-1f7d50b3b039',
                          status: 'SUCCESS',
                          amount: 55000,
                          fee: 0,
                          currency: 'NGN',
                          channel: 'WALLET',
                          summary: '',
                        },
                        created_at: '2022-08-22T09:14:24.767934+01:00',
                        updated_at: '2022-08-22T09:14:24.767934+01:00',
                      },
                    ],
                    meta: {
                      page: 1,
                      page_size: 2,
                      total: 26,
                    },
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully',
                  data: [
                    {
                      transaction_id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                      related_transaction_id: null,
                      wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                      debit: 55000,
                      credit: 0,
                      previous_balance: 500000000000,
                      current_balance: 499999945000,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                      transaction: {
                        id: 'a4a6e17b-96a5-4a38-95d4-c9e82eb05297',
                        status: 'SUCCESS',
                        amount: 55000,
                        fee: 0,
                        currency: 'NGN',
                        channel: 'WALLET',
                        summary: '',
                      },
                      created_at: '2022-08-22T09:12:58.945497+01:00',
                      updated_at: '2022-08-22T09:12:58.945497+01:00',
                    },
                    {
                      transaction_id: 'df82f1c4-6fad-45b8-a357-1f7d50b3b039',
                      related_transaction_id: null,
                      wallet_id: 'fb3a1b04-6216-4943-b3e5-1ef9ed7b2db1',
                      debit: 55000,
                      credit: 0,
                      previous_balance: 499999945000,
                      current_balance: 499999890000,
                      balance_type: 'AVAILABLE',
                      reversal: false,
                      transaction: {
                        id: 'df82f1c4-6fad-45b8-a357-1f7d50b3b039',
                        status: 'SUCCESS',
                        amount: 55000,
                        fee: 0,
                        currency: 'NGN',
                        channel: 'WALLET',
                        summary: '',
                      },
                      created_at: '2022-08-22T09:14:24.767934+01:00',
                      updated_at: '2022-08-22T09:14:24.767934+01:00',
                    },
                  ],
                  meta: {
                    page: 1,
                    page_size: 2,
                    total: 26,
                  },
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/test/wallet/credit': {
      post: {
        summary: 'Credit Test Wallet',
        description: 'The resource enables the credit of the sandbox wallet.',
        operationId: 'postV1TestWalletCredit',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'integer',
                  },
                  currency: {
                    type: 'string',
                    description:
                      'The currency code of the test wallet to credit.',
                    default: 'NGN',
                  },
                },
                required: ['amount', 'currency'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully credited wallet',
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully credited wallet',
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully credited wallet',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/test/issuing/{id}/mock-transaction': {
      post: {
        summary: 'Mock Card Transaction',
        description:
          'This resource enables you to mock a card transaction. It works only on the sandbox environment .',
        operationId: 'postV1TestIssuingIdMockTransaction',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'The test card ID',
            schema: {
              type: 'string',
              description: 'The test card ID',
              default: '130e9925-888e-43d7-9ce6-31156b8f3fe7',
            },
            example: '130e9925-888e-43d7-9ce6-31156b8f3fe7',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'string',
                    default: '10000',
                  },
                  type: {},
                },
                example: {
                  amount: '10000',
                  type: 'CREDIT',
                },
                required: ['amount', 'type'],
              },
              example: {
                amount: '10000',
                type: 'CREDIT',
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    event: {
                      type: 'string',
                      example: 'issuing.transaction',
                    },
                    amount: {
                      type: 'integer',
                      example: 10000,
                    },
                    currency: {
                      type: 'string',
                      example: 'USD',
                    },
                    card_id: {
                      type: 'string',
                      example: '130e9925-888e-43d7-9ce6-31156b8f3fe7',
                    },
                    type: {
                      type: 'string',
                      example: 'CREDIT',
                    },
                    reference: {},
                    description: {
                      type: 'string',
                      example: 'Visa Virtual dollar card funding',
                    },
                    status: {
                      type: 'string',
                      example: 'SUCCESS',
                    },
                    created_at: {
                      type: 'string',
                      example: '2022-07-02 01:24:08.815361 -0500 CDT',
                    },
                    updated_at: {
                      type: 'string',
                      example: '2022-07-02 01:24:08.815361 -0500 CDT',
                    },
                  },
                  example: {
                    event: 'issuing.transaction',
                    amount: 10000,
                    currency: 'USD',
                    card_id: '130e9925-888e-43d7-9ce6-31156b8f3fe7',
                    type: 'CREDIT',
                    reference: null,
                    description: 'Visa Virtual dollar card funding',
                    status: 'SUCCESS',
                    created_at: '2022-07-02 01:24:08.815361 -0500 CDT',
                    updated_at: '2022-07-02 01:24:08.815361 -0500 CDT',
                  },
                },
                example: {
                  event: 'issuing.transaction',
                  amount: 10000,
                  currency: 'USD',
                  card_id: '130e9925-888e-43d7-9ce6-31156b8f3fe7',
                  type: 'CREDIT',
                  reference: null,
                  description: 'Visa Virtual dollar card funding',
                  status: 'SUCCESS',
                  created_at: '2022-07-02 01:24:08.815361 -0500 CDT',
                  updated_at: '2022-07-02 01:24:08.815361 -0500 CDT',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
    '/v1/test/collection/mock-transaction': {
      post: {
        summary: 'Mock Collection Transaction',
        description: 'This resource helps to mock a collection transaction.',
        operationId: 'postV1TestCollectionMockTransaction',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  amount: {
                    type: 'string',
                    default: '10000',
                  },
                  account_id: {
                    type: 'string',
                  },
                  reference: {
                    type: 'string',
                  },
                },
                example: {
                  amount: '10000',
                },
                required: ['amount'],
              },
              example: {
                amount: '10000',
              },
            },
          },
        },
        responses: {
          '200': {
            description: '200',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'boolean',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      example: 'Successfully mocked collection transaction',
                    },
                  },
                  example: {
                    status: true,
                    message: 'Successfully mocked collection transaction',
                  },
                },
                example: {
                  status: true,
                  message: 'Successfully mocked collection transaction',
                },
              },
            },
          },
          '400': {
            description: '400',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {},
                  example: {},
                },
                example: {},
              },
            },
          },
        },
      },
    },
  },
}

export const extractedApiDocumentSdk: OpenApiRuntimeBundle<ExtractedApiDocumentApi> =
{
  document: extractedApiDocument,
  manifest: extractedApiDocumentManifest,
}

export default extractedApiDocument
