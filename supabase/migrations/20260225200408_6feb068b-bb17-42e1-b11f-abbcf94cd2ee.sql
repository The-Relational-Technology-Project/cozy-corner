-- Remove old Wednesday morning cron job and create Tuesday evening one
SELECT cron.unschedule('wednesday-reminder-email');

-- Schedule for Tuesday 7pm PT = Wednesday 3:00 UTC
SELECT cron.schedule(
  'tuesday-evening-reminder-email',
  '0 3 * * 3',
  $$
  SELECT
    net.http_post(
        url:='https://qxbfzliqcfvluebyqynt.supabase.co/functions/v1/send-wednesday-reminder',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YmZ6bGlxY2Z2bHVlYnlxeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDUyNTgsImV4cCI6MjA2NTAyMTI1OH0.7IFEx5Hhtd1v58rp8TpqwZixREU0nACBw8h-8dA_QQw"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);