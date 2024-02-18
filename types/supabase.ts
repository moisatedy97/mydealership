export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Car: {
        Row: {
          carId: number
          categoryId: number
          description: string
          engineType: Database["public"]["Enums"]["car_engine_type"]
          fuelType: Database["public"]["Enums"]["car_fuel_type"]
          horsepower: number
          images: string[]
          km: number
          kmPerLiterCity: number
          kmPerLiterHighway: number
          manufacturerId: number
          modelId: number
          price: number
          status: Database["public"]["Enums"]["car_status_type"]
          title: string
          torque: number
          transmissionType: Database["public"]["Enums"]["car_transmission_type"]
          year: number
        }
        Insert: {
          carId?: number
          categoryId: number
          description?: string
          engineType: Database["public"]["Enums"]["car_engine_type"]
          fuelType: Database["public"]["Enums"]["car_fuel_type"]
          horsepower: number
          images: string[]
          km: number
          kmPerLiterCity: number
          kmPerLiterHighway: number
          manufacturerId: number
          modelId: number
          price: number
          status?: Database["public"]["Enums"]["car_status_type"]
          title?: string
          torque: number
          transmissionType: Database["public"]["Enums"]["car_transmission_type"]
          year: number
        }
        Update: {
          carId?: number
          categoryId?: number
          description?: string
          engineType?: Database["public"]["Enums"]["car_engine_type"]
          fuelType?: Database["public"]["Enums"]["car_fuel_type"]
          horsepower?: number
          images?: string[]
          km?: number
          kmPerLiterCity?: number
          kmPerLiterHighway?: number
          manufacturerId?: number
          modelId?: number
          price?: number
          status?: Database["public"]["Enums"]["car_status_type"]
          title?: string
          torque?: number
          transmissionType?: Database["public"]["Enums"]["car_transmission_type"]
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "Car_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Category"
            referencedColumns: ["categoryId"]
          },
          {
            foreignKeyName: "Car_manufacturerId_fkey"
            columns: ["manufacturerId"]
            isOneToOne: false
            referencedRelation: "Manufacturer"
            referencedColumns: ["manufacturerId"]
          },
          {
            foreignKeyName: "public_Car_modelId_fkey"
            columns: ["modelId"]
            isOneToOne: false
            referencedRelation: "CarModel"
            referencedColumns: ["carModelId"]
          }
        ]
      }
      CarModel: {
        Row: {
          carModelId: number
          manufacturerId: number
          name: string
        }
        Insert: {
          carModelId?: number
          manufacturerId: number
          name?: string
        }
        Update: {
          carModelId?: number
          manufacturerId?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_CarModel_manufacturerId_fkey"
            columns: ["manufacturerId"]
            isOneToOne: false
            referencedRelation: "Manufacturer"
            referencedColumns: ["manufacturerId"]
          }
        ]
      }
      CarOrder: {
        Row: {
          carId: number
          carPrice: number
          orderCarId: number
          orderId: number
          quantity: number
        }
        Insert: {
          carId: number
          carPrice: number
          orderCarId?: number
          orderId: number
          quantity?: number
        }
        Update: {
          carId?: number
          carPrice?: number
          orderCarId?: number
          orderId?: number
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "CarOrder_carId_fkey"
            columns: ["carId"]
            isOneToOne: false
            referencedRelation: "Car"
            referencedColumns: ["carId"]
          },
          {
            foreignKeyName: "CarOrder_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["orderId"]
          }
        ]
      }
      Category: {
        Row: {
          categoryId: number
          name: string
        }
        Insert: {
          categoryId?: number
          name?: string
        }
        Update: {
          categoryId?: number
          name?: string
        }
        Relationships: []
      }
      Manufacturer: {
        Row: {
          manufacturerId: number
          name: string
        }
        Insert: {
          manufacturerId?: number
          name?: string
        }
        Update: {
          manufacturerId?: number
          name?: string
        }
        Relationships: []
      }
      Order: {
        Row: {
          orderDate: string
          orderId: number
          totalAmout: number
          userId: string
        }
        Insert: {
          orderDate?: string
          orderId?: number
          totalAmout: number
          userId: string
        }
        Update: {
          orderDate?: string
          orderId?: number
          totalAmout?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Order_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      Payment: {
        Row: {
          orderId: number
          paymentAmount: number
          paymentDate: string
          paymentId: number
          paymentMethod: string
          transactionId: string
        }
        Insert: {
          orderId: number
          paymentAmount: number
          paymentDate?: string
          paymentId?: number
          paymentMethod?: string
          transactionId?: string
        }
        Update: {
          orderId?: number
          paymentAmount?: number
          paymentDate?: string
          paymentId?: number
          paymentMethod?: string
          transactionId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Payment_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Order"
            referencedColumns: ["orderId"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      car_engine_type: "Combustion" | "Electric" | "Hybrid"
      car_fuel_type:
        | "Diesel"
        | "Petrol"
        | "Hydrogen"
        | "Electricity"
        | "LPG"
        | "Methane"
      car_status_type: "Coming soon" | "On sale" | "Sold" | "In process"
      car_transmission_type: "Automatic" | "Manual"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
