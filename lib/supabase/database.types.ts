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
      preview_submissions: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          business_name: string;
          contact_name: string;
          email: string;
          phone: string | null;
          website: string | null;
          industry: string;
          main_services: string | null;
          main_lead_sources: string[];
          biggest_bottleneck: string | null;
          current_problem: string;
          current_tools: string | null;
          lead_process: string | null;
          average_job_value: number | null;
          monthly_lead_volume: string;
          anything_else: string | null;
          notes: string | null;
          preview_data: Json;
          manager_notes: Json;
          selected_system_template: string | null;
          selected_package: string | null;
          classification_json: Json;
          prompt_worker_result_json: Json;
          generated_chatgpt_prompt: string | null;
          prompt_status: string;
          internal_notes: string | null;
          contact_allowed: boolean;
          is_test_submission: boolean;
          test_reason: string | null;
          customer_email_sent_at: string | null;
          marked_paid_at: string | null;
          marked_lost_at: string | null;
          status: string;
          owner_approved: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          business_name: string;
          contact_name: string;
          email: string;
          phone?: string | null;
          website?: string | null;
          industry: string;
          main_services?: string | null;
          main_lead_sources?: string[];
          biggest_bottleneck?: string | null;
          current_problem: string;
          current_tools?: string | null;
          lead_process?: string | null;
          average_job_value?: number | null;
          monthly_lead_volume?: string;
          anything_else?: string | null;
          notes?: string | null;
          preview_data?: Json;
          manager_notes?: Json;
          selected_system_template?: string | null;
          selected_package?: string | null;
          classification_json?: Json;
          prompt_worker_result_json?: Json;
          generated_chatgpt_prompt?: string | null;
          prompt_status?: string;
          internal_notes?: string | null;
          contact_allowed?: boolean;
          is_test_submission?: boolean;
          test_reason?: string | null;
          customer_email_sent_at?: string | null;
          marked_paid_at?: string | null;
          marked_lost_at?: string | null;
          status?: string;
          owner_approved?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["preview_submissions"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
