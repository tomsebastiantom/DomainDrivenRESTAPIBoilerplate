import { Mapper } from '../../../shared/infra/Mapper';

import { Site } from '../domain/site';
import { SiteDTO } from '../dtos/siteDTO';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';


export class SiteMap implements Mapper<Site> {

  public static toDomain(raw: any): Site {
    const siteOrError = Site.create(
      {
        siteName: raw.siteName,
        instructions: raw.description,
        isActive: raw.isActive,
        creationTimestamp: raw.creationTimestamp,
        lastUpdatedTimestamp: raw.lastUpdatedTimestamp,
        address: raw.address,
        companyName: raw.companyName,
        contacts: raw.contacts
      },
      new UniqueEntityID(raw.siteId)
    );
    siteOrError.isFailure ? console.log(siteOrError.getErrorValue()) : '';
    return siteOrError.isSuccess ? siteOrError.getValue() : null;
  }
  public static toPersistence(site: Site): any {
    return {
      siteId: site.siteId.id.toString(),
      siteName: site.siteName,
      instructions: site.instructions,
      creationTimestamp: site.creationTimestamp,
      lastUpdatedTimestamp: site.lastUpdatedTimestamp,
      address: site.address,
      companyName: site.companyName,
      contacts: site.contacts
    };
  }

  public static toDTO(site: Site): SiteDTO {
    return {
      siteId: site.siteId,
      siteName: site.siteName,
      instructions: site.instructions,
      isActive: site.isActive,
      lastUpdatedTimestamp: site.lastUpdatedTimestamp,
      creationTimestamp: site.creationTimestamp,
      address: site.address,
      companyName: site.companyName,
      contacts: site.contacts
    };
  }
}

