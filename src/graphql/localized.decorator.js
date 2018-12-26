const { defaultFieldResolver } = require("graphql");
const graphqlTools = require("graphql-tools");

class LocalizedDirective extends graphqlTools.SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { propertyToLocalize } = this.args;
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args) {
      let getRootObjectFromArgs = function(args) {
        if (args && args.length > 0 && args[0]) {
          return args[0];
        }
        return null;
      };

      let getLocaleFromContext = function(args) {
        if (args && args.length > 1 && args[2] && args[2].ctx && args.ctx.req && args.ctx.req.headers && args.ctx.req.headers["Accept-Language"]) {
          return args.ctx.req.headers.locale;
        }
        return null;
      };

      let isKeyInLocalizedString = function(rootObject, propertyToLocalize, key) {
        return rootObject[propertyToLocalize].hasOwnProperty(key);
      };

      let getValueFromLocalizedString = function(rootObject, propertyToLocalize, key) {
        return rootObject[propertyToLocalize][key];
      };

      // source, args, context, info
      let rootObject = getRootObjectFromArgs(args);
      if (!propertyToLocalize || !rootObject) {
        return "";
      }

      let locale = getLocaleFromContext(args);
      if (isKeyInLocalizedString(rootObject, propertyToLocalize, locale)) {
        return getValueFromLocalizedString(rootObject, propertyToLocalize, locale);
      }

      let language = locale && locale.length > 2 ? locale.substring(0, 2) : "";
      if (isKeyInLocalizedString(rootObject, propertyToLocalize, language)) {
        return getValueFromLocalizedString(rootObject, propertyToLocalize, language);
      }

      let defaultLanguage = "en";
      if (isKeyInLocalizedString(rootObject, propertyToLocalize, defaultLanguage)) {
        return getValueFromLocalizedString(rootObject, propertyToLocalize, defaultLanguage);
      }

      return rootObject[0] || "";
    };
  }
}

module.exports.LocalizedDirective = LocalizedDirective;
