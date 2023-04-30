import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { SiteCreated } from './events/siteCreated';
import { Contact } from './contact';
import { Address } from './address';
import { Instruction } from './instruction';
import { SiteName } from './siteName';

export interface SiteProps {
  siteName: SiteName;
  address: Address;
  companyName: string;
  contacts: [Contact];
  isActive: boolean;
  instructions: [Instruction];
  creationDate: Date;
  lastUpdatedDate: Date;
}

export class Site extends AggregateRoot<SiteProps> {
  get siteId(): SiteId {
    return SiteId.create(this._id).getValue();
  }

  get siteName(): SiteName {
    return this.siteName;
  }

  get address(): Address {
    return this.address;
  }
  get companyName(): string {
    return this.props.companyName;
  }
  get isActive(): boolean {
    return this.props.isActive;
  }
  set isActive(isActive: boolean) {
    this.props.isActive = isActive;
  }
  get creationDate(): Date {
    return this.props.creationDate;
  }
  get lastUpdatedDate(): Date {
    return this.props.lastUpdatedDate;
  }
  get instructions(): [Instruction] {
    return this.props.instructions;
  }
  set lastUpdatedDate(lastUpdatedDate: Date) {
    this.props.lastUpdatedDate = lastUpdatedDate;
  }
  get contacts(): [Contact] {
    return this.props.contacts;
  }
  public addContact(contact: Contact): void {
    this.props.contacts.push(contact);
    // this.addDomainEvent(new CheckpointCreated(contact));
  }
  public addInstruction(instruction: Instruction): void {
    this.props.instructions.push(instruction);
  }
  private constructor(props: SiteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: SiteProps, id?: UniqueEntityID): Result<Site> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.siteName, argumentName: 'memberId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Site>(nullGuard.getErrorValue());
    } else {
      const isNewSite = !!id === false;

      const site = new Site({ ...props, isActive: true }, id);

      if (isNewSite) {
        site.addDomainEvent(new SiteCreated(site));
      }

      return Result.ok<Site>(site);
    }
  }
}
