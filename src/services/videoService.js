import config from "../../config.json";
import { createClient } from '@supabase/supabase-js'

export function videoService() {

    const supabaseUrl = config.supabaseUrl;
    const supabaseKey = config.supabaseKey;
    const supabase = createClient(supabaseUrl, supabaseKey);
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        },

        insert(video) {
            return supabase.from("video")
                .insert(video)
        }
    }
}