import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { Instruction } from './instruction';
import { UserId } from '../../users/domain/userId';
import { Entity } from '../../../shared/domain/Entity';
import { ScanId } from './scanId';

export interface ScanProps {
  siteId: SiteId;
  userId: UserId;
  scanId: ScanId;
  identifier: string;
  timestamp: Date;
  checkpointId: string;
  location: string;
  comment?: Instruction[];
  assets?: Instruction[];
}

export class Scan extends Entity<ScanProps> {
  get siteId(): SiteId {
    return this.props.siteId;
  }
  get userId(): UserId {
    return this.props.userId;
  }
  set userId(userId: UserId) {
    this.props.userId = userId;
  }
  get scanId(): ScanId {
    return ScanId.create(this._id).getValue();
  }

  get timestamp(): Date {
    return this.props.timestamp;
  }
  set timestamp(timestamp: Date) {
    this.props.timestamp = timestamp;
  }
  get checkpointId(): string {
    return this.props.checkpointId;
  }
  set checkpointId(checkpointId: string) {
    this.props.checkpointId = checkpointId;
  }
  get location(): string {
    return this.props.location;
  }
  set location(location: string) {
    this.props.location = location;
  }

  private constructor(props: ScanProps, id?: UniqueEntityID) {
    super(props, id);
  }
  //Todo Guard against null or undefined
  public static create(props: ScanProps, id?: UniqueEntityID): Result<Scan> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.siteId, argumentName: 'siteId' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Scan>(nullGuard.getErrorValue());
    } else {
      const scan = new Scan({ ...props }, id);

      return Result.ok<Scan>(scan);
    }
  }
}
