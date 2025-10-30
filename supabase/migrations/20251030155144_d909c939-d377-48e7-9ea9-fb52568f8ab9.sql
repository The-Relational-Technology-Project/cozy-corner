-- Enable required extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the cron job to send Wednesday reminder every Wednesday at 7 AM Pacific (14:00 UTC)
SELECT cron.schedule(
  'wednesday-reminder-email',
  '0 14 * * 3', -- Every Wednesday at 14:00 UTC (7 AM Pacific)
  $$
  SELECT
    net.http_post(
        url:='https://qxbfzliqcfvluebyqynt.supabase.co/functions/v1/send-wednesday-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YmZ6bGlxY2Z2bHVlYnlxeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDUyNTgsImV4cCI6MjA2NTAyMTI1OH0.7IFEx5Hhtd1v58rp8TpqwZixREU0nACBw8h-8dA_QQw"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);