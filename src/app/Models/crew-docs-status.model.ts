export class CrewDocsStatus {
    countryId:any;
    constructor(
        public status: string) { }
}

export class DocumentType {
    constructor(
        public status: string,
        public documentType: string
    ) { }
}

export class TravelDocuments {
    constructor(
        public documentType: string,
        public documents: string
    ) { }
}

export class Medical {
    constructor(
        public documentType: string,
        public medicals: string
    ) { }
}

export class DocumentCategory {
    constructor(
        public status: string,
        public documentCategory: string
    ) { }
}

export class CoursesCategory {
    constructor(
        public documentCategory: string,
        public documentType: string
    ) { }
}

export class OthersCategory {
    constructor(
        public documentCategory: string,
        public documentType: string

    ) { }
}