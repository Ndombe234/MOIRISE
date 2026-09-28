revoke all on function public.is_social_conversation_member(uuid, uuid), public.is_social_group_member(uuid, uuid), public.is_social_group_admin(uuid, uuid) from anon;
grant execute on function public.is_social_conversation_member(uuid, uuid), public.is_social_group_member(uuid, uuid), public.is_social_group_admin(uuid, uuid) to authenticated;
