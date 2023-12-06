"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FindQueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this?.modelQuery?.find({
                $or: searchableFields?.map((field) => ({
                    [field]: { $regex: searchTerm, options: "i" },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = { ...this?.query };
        const excludes = ["searchTerm", "sort", "limit", "page", "fields"];
        excludes.forEach((el) => delete queryObj[el]);
        this.modelQuery = this?.modelQuery?.find(queryObj);
        return this;
    }
    sort() {
        // const sort = (this?.query?.sort as string) || "-createdAt";
        const sort = this?.query?.sort?.split(",")?.join(" ") || "-createdAt";
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
        const fields = this?.query?.fields?.split(",")?.join(" ") || "-__v";
        this.modelQuery = this?.modelQuery.select(fields);
        return this;
    }
}
exports.default = FindQueryBuilder;
