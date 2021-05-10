export interface CompaniesInterface {
  [key: string]: {
    users: Set<string>
    jobs: Set<string>
  }
}
