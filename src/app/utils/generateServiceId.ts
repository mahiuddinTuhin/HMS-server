/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

/*
 *    generating Service Id
 *     param collectio name
 *    return new service id
 */

const generateServiceId = async (Collection: any) => {
  /* finding last id on a role*/
  let lastThreeDigit: any = "000";
  const modelName: string = Collection?.modelName?.substring(0, 3);

  const { id } = (await Collection.findOne()
    .sort({ createdAt: -1 })
    .lean()) || {
    id: modelName + lastThreeDigit,
  };

  lastThreeDigit = id?.toString()?.substring(3, 6);

  const incrementedId = (Number(lastThreeDigit) + 1)
    .toString()
    .padStart(3, "0");

  const newId: string = modelName + incrementedId;
  return newId;
};

export default generateServiceId;
