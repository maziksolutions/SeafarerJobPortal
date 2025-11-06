export class ExpnsesType {
    constructor(
        // public typeId: number,
        public type: string) { }
}

export class PniExpenses {
    constructor(
        // public expensesId: number,
        // public typeId: number,
        public type: string,
        public expenses: string
    ) { }
}