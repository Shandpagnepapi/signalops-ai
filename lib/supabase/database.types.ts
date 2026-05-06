export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          source: string;
          name: string;
          email: string | null;
          phone: string | null;
          business_name: string | null;
          website: string | null;
          industry: string | null;
          service_needed: string | null;
          urgency: string | null;
          address: string | null;
          message: string | null;
          vehicle_year_make_model: string | null;
          wheel_size: string | null;
          damage_type: string | null;
          number_of_wheels: number;
          vehicle_drivable: string | null;
          needs_mobile_service: string | null;
          photo_notes: string | null;
          preferred_time: string | null;
          score: number;
          priority: string;
          status: string;
          ai_summary: string | null;
          ai_urgency: string | null;
          ai_confidence: number | null;
          needs_human_review: boolean;
          recommended_action: string | null;
          customer_reply: string | null;
          internal_note: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          source?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          business_name?: string | null;
          website?: string | null;
          industry?: string | null;
          service_needed?: string | null;
          urgency?: string | null;
          address?: string | null;
          message?: string | null;
          vehicle_year_make_model?: string | null;
          wheel_size?: string | null;
          damage_type?: string | null;
          number_of_wheels?: number;
          vehicle_drivable?: string | null;
          needs_mobile_service?: string | null;
          photo_notes?: string | null;
          preferred_time?: string | null;
          score?: number;
          priority?: string;
          status?: string;
          ai_summary?: string | null;
          ai_urgency?: string | null;
          ai_confidence?: number | null;
          needs_human_review?: boolean;
          recommended_action?: string | null;
          customer_reply?: string | null;
          internal_note?: string | null;
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
        Relationships: [];
      };
      lead_events: {
        Row: {
          id: string;
          lead_id: string;
          event_type: string;
          title: string;
          description: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          event_type: string;
          title: string;
          description?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["lead_events"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey";
            columns: ["lead_id"];
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
      lead_messages: {
        Row: {
          id: string;
          lead_id: string;
          channel: string;
          direction: string;
          subject: string | null;
          body: string;
          status: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          channel?: string;
          direction?: string;
          subject?: string | null;
          body: string;
          status?: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["lead_messages"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "lead_messages_lead_id_fkey";
            columns: ["lead_id"];
            referencedRelation: "leads";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
