import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Report = {
  title: string
  coordinatorName: string
  date: string
  status: string
}

export const SubmittedReports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/submit-report')
        if (response.ok) {
          const data = await response.json()
          setReports(data)
        } else {
          console.error('Failed to fetch reports')
        }
      } catch (error) {
        console.error('Error fetching reports:', error)
      }
    }

    fetchReports()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Submitted Reports</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Coordinator</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.coordinatorName}</TableCell>
              <TableCell>{report.date}</TableCell>
              <TableCell>{report.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
