'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { ModalForm } from '@/components/modal-form'

interface Exhibition {
  id: number
  name: string
  startDate: string
  endDate: string
  image: string
}

const initialExhibitions: Exhibition[] = [
  { id: 1, name: "El Cuerpo Humano", startDate: "2023-04-01", endDate: "2023-08-31", image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Explorando el Espacio", startDate: "2023-05-15", endDate: "2023-09-15", image: "/placeholder.svg?height=100&width=100" },
  { id: 3, name: "Mundo Submarino", startDate: "2023-06-01", endDate: "2023-10-31", image: "/placeholder.svg?height=100&width=100" },
]

export function ExhibitionsTable() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(initialExhibitions)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentExhibition, setCurrentExhibition] = useState<Exhibition | null>(null)

  const handleAdd = () => {
    setCurrentExhibition(null)
    setIsModalOpen(true)
  }

  const handleEdit = (id: number) => {
    const exhibitionToEdit = exhibitions.find(item => item.id === id)
    if (exhibitionToEdit) {
      setCurrentExhibition(exhibitionToEdit)
      setIsModalOpen(true)
    }
  }

  const handleDelete = (id: number) => {
    setExhibitions(exhibitions.filter(item => item.id !== id))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newExhibition: Exhibition = {
      id: currentExhibition ? currentExhibition.id : Date.now(),
      name: formData.get('name') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      image: formData.get('image') as string,
    }

    if (currentExhibition) {
      setExhibitions(exhibitions.map(item => item.id === currentExhibition.id ? newExhibition : item))
    } else {
      setExhibitions([...exhibitions, newExhibition])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-green-700">Exposiciones</h2>
        <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Exposición
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Fecha de Inicio</TableHead>
            <TableHead>Fecha de Fin</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exhibitions.map((item) => (
            <TableRow key={item.id} className="hover:bg-green-50 transition-colors">
              <TableCell>
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.endDate}</TableCell>
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
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentExhibition ? "Editar Exposición" : "Añadir Exposición"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" defaultValue={currentExhibition?.name} required />
          </div>
          <div>
            <Label htmlFor="startDate">Fecha de Inicio</Label>
            <Input id="startDate" name="startDate" type="date" defaultValue={currentExhibition?.startDate} required />
          </div>
          <div>
            <Label htmlFor="endDate">Fecha de Fin</Label>
            <Input id="endDate" name="endDate" type="date" defaultValue={currentExhibition?.endDate} required />
          </div>
          <div>
            <Label htmlFor="image">URL de la Imagen</Label>
            <Input id="image" name="image" defaultValue={currentExhibition?.image} required />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            {currentExhibition ? "Actualizar" : "Añadir"}
          </Button>
        </form>
      </ModalForm>
    </div>
  )
}

