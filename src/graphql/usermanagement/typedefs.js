// GENERATED

const { gql } = require("apollo-server");

const typedefs = gql`
  ### Value Types

  type Name {
    first: String
    last: String
  }

  type EntityReference {
    id: String
    name: String
  }

  type AuditData {
    at: String
    by: EntityReference
  }

  ### Entities

  type User {
    id: String
    name: Name
    language: String
    country: String
    email: String
    phone: String
    companyName: String
    permissionGroups: [PermissionGroup]
    created: AuditData
    modified: AuditData
    deleted: AuditData
  }

  type PermissionGroup {
    id: String
    name: JSON
    localizedName(language: String): String
    description: JSON
    localizedDescription: String @localized(propertyToLocalize: "description")
    permissions: [Permission]
    created: AuditData
    modified: AuditData
    deleted: AuditData
  }

  type Permission {
    id: String
    name: JSON
    description: JSON
  }
`;

module.exports.typedefs = typedefs;
