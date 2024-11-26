import { NewsTable } from './dashboard/news-table'
import { ExhibitionsTable } from './dashboard/exhibitions-table'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Museo Papalote</h1>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="col-span-full md:col-span-1">
            <NewsTable />
          </div>
          <div className="col-span-full md:col-span-1">
            <ExhibitionsTable />
          </div>
        </div>
      </div>
    </div>
  )
}

