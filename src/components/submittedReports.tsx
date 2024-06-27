'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from 'axios'

type Report = {
    title: string
    coordinatorName: string
    date: string
    status: string
}

export const SubmittedReports: React.FC = () => {
    //const [reports, setReports] = useState<Report[]>([])
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])


    useEffect(() => {
       const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get('https://api.github.com/repositories/207645083')
                setData(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }

        }

        fetchData()
    },[setData])
  
    //https://api.github.com/repositories/
   

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
              {/* {reports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>{report.coordinatorName}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.status}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </div>
      )
    }