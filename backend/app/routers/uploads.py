from app.database.supabase import supabase
import uuid

class StorageService:
    async def upload_thumbnail(self, user_id: str, file: any) -> dict:
        file_bytes = await file.read()
        filename = f"{user_id}/{uuid.uuid4()}.{file.filename.split('.')[-1]}"
        
        supabase.storage.from_("project-thumbnails").upload(
            path=filename,
            file=file_bytes,
            file_options={"content-type": file.content_type}
        )
        
        url = supabase.storage.from_("project-thumbnails").get_public_url(filename)
        return {"url": url, "path": filename}

    async def upload_screenshots(self, user_id: str, files: list) -> dict:
        urls = []
        for file in files:
            file_bytes = await file.read()
            filename = f"{user_id}/{uuid.uuid4()}.{file.filename.split('.')[-1]}"
            
            supabase.storage.from_("project-screenshots").upload(
                path=filename,
                file=file_bytes,
                file_options={"content-type": file.content_type}
            )
            urls.append(supabase.storage.from_("project-screenshots").get_public_url(filename))
            
        return {"urls": urls, "count": len(urls)}

storage_service = StorageService()  