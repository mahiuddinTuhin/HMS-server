"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 *    generating Service Id
 *     param collectio name
 *    return new service id
 */
const generateServiceId = async (Collection) => {
    /* finding last id on a role*/
    let lastThreeDigit = "000";
    const modelName = Collection?.modelName?.substring(0, 3);
    const { id } = (await Collection.findOne()
        .sort({ createdAt: -1 })
        .lean()) || {
        id: modelName + lastThreeDigit,
    };
    lastThreeDigit = id?.toString()?.substring(3, 6);
    const incrementedId = (Number(lastThreeDigit) + 1)
        .toString()
        .padStart(3, "0");
    const newId = modelName + incrementedId;
    return newId;
};
exports.default = generateServiceId;
