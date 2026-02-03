'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

interface ChartData {
    name: string
    total: number
}

export function DashboardCharts({ data }: { data: ChartData[] }) {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                            contentStyle={{ 
                                backgroundColor: '#0f0f0f', 
                                borderRadius: '8px', 
                                border: '1px solid #1f1f1f', 
                                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                                color: '#ffffff'
                            }}
                            itemStyle={{ color: '#ffffff' }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
