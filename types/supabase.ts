export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Car: {
        Row: {
          cardId: number
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
          model: string
          price: number
          torque: number
          transmissionType: Database["public"]["Enums"]["car_transmission_type"]
          year: number
        }
        Insert: {
          cardId?: number
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
          model?: string
          price: number
          torque: number
          transmissionType: Database["public"]["Enums"]["car_transmission_type"]
          year: number
        }
        Update: {
          cardId?: number
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
          model?: string
          price?: number
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
