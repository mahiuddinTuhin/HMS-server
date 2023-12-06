/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterQuery, Query } from "mongoose";

class FindQueryBuilder<T> {
  [x: string]: any;
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      this.modelQuery = this?.modelQuery?.find({
        $or: searchableFields?.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, options: "i" },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj: any = { ...this?.query };

    const excludes = ["searchTerm", "sort", "limit", "page", "fields"];
    excludes.forEach((el) => delete queryObj[el]);

    this.modelQuery = this?.modelQuery?.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    // const sort = (this?.query?.sort as string) || "-createdAt";
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";

    this.modelQuery = this?.modelQuery?.sort(sort);

    return this;
  }

  pagination() {
    const page = this?.query?.page || 1;
    const limit = this?.query?.limit || 1;
    const skip = (Number(page) - 1) * Number(limit) || 0;

    this.modelQuery = this?.modelQuery.skip(skip);
    return this;
  }

  limit() {
    const limit = Number(this?.query?.limit) || 1;
    this.modelQuery = this?.modelQuery.limit(limit);
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this?.modelQuery.select(fields);

    return this;
  }
}

export default FindQueryBuilder;
