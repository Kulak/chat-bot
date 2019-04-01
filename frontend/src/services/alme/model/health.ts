
export class HealthItem {
    public name: string
    public state: string
    public reason: string
}

export type HealthResponse = HealthItem[]
