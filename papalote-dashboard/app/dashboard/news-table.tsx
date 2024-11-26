'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { ModalForm } from '@/components/modal-form'

interface News {
  id: number
  title: string
  date: string
  image: string
}

const initialNews: News[] = [
  { id: 1, title: "Nueva exposición de dinosaurios", date: "2023-05-15", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, title: "Taller de ciencias para niños", date: "2023-06-01", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, title: "Visita especial de astronauta", date: "2023-06-15", image: "/placeholder.svg?height=100&width=100" },
]

export function NewsTable() {
  const [news, setNews] = useState<News[]>(initialNews)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentNews, setCurrentNews] = useState<News | null>(null)

  const handleAdd = () => {
    setCurrentNews(null)
    setIsModalOpen(true)
  }

  const handleEdit = (id: number) => {
    const newsToEdit = news.find(item => item.id === id)
    if (newsToEdit) {
      setCurrentNews(newsToEdit)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    setNews(news.filter(item => item.id !== id))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newNews: News = {
      id: currentNews ? currentNews.id : Date.now(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      image: formData.get('image') as string,
    }

    if (currentNews) {
      setNews(news.map(item => item.id === currentNews.id ? newNews : item))
    } else {
      setNews([...news, newNews])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-green-700">Noticias</h2>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Noticia
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagen</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {news.map((item) => (
            <TableRow key={item.id} className="hover:bg-green-50 transition-colors">
              <TableCell>
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                  <Pencil className="h-4 w-4 text-green-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentNews ? "Editar Noticia" : "Añadir Noticia"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" defaultValue={currentNews?.title} required />
          </div>
          <div>
            <Label htmlFor="date">Fecha</Label>
            <Input id="date" name="date" type="date" defaultValue={currentNews?.date} required />
          </div>
          <div>
            <Label htmlFor="image">URL de la Imagen</Label>
            <Input id="image" name="image" defaultValue={currentNews?.image} required />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            {currentNews ? "Actualizar" : "Añadir"}
          </Button>
        </form>
      </ModalForm>
    </div>
  )
}

