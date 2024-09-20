import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Bar,
  BarChart,
  LabelList,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig, pieChartConfig, barChartConfig } from "@/constants/chartsConfigExample";
import { chartData, pieChartData, BarChartData } from "@/constants/chartsdataMocks";



export default function Demographic() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Age and Sex Distribution */}
      <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="text-blue-600">
            Age and Sex Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieChartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Geographic Distribution of Patients */}
      <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="text-blue-600">
            Geographic Distribution of Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-blue-50 flex items-center justify-center rounded-md relative">
            <MapPin
              className="w-12 h-12 text-blue-500 absolute"
              style={{ top: "30%", left: "40%" }}
            />
            <MapPin
              className="w-8 h-8 text-blue-500 absolute"
              style={{ top: "50%", left: "60%" }}
            />
            <MapPin
              className="w-6 h-6 text-blue-500 absolute"
              style={{ top: "70%", left: "30%" }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Non-Pathological Background Trends */}
      <Card className="col-span-2 bg-white shadow-md hover:bg-blue-50 transition-colors">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="text-blue-600">
            Non-Pathological Background Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Distribution of Pathological Background */}
      <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="text-blue-600">
            Distribution of Pathological Background
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-blue-50 flex items-center justify-center rounded-md">
            <PieChart className="w-16 h-16 text-blue-400" />
          </div>
        </CardContent>
      </Card>

      {/* Frequency of Hereditary-Familial Diseases */}
      <Card className="bg-white shadow-md hover:bg-blue-50 transition-colors">
        <CardHeader className="border-b border-blue-100">
          <CardTitle className="text-blue-600">
            Frequency of Hereditary-Familial Diseases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart
              accessibilityLayer
              data={BarChartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
