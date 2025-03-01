import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js'


// SUPABASE CLIENT 
const bucketName = "KeyBidsBucket"
const supabase = createClient("https://vkoqiqkoixdhweekdqmv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrb3FpcWtvaXhkaHdlZWtkcW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg5MDEwODIsImV4cCI6MjAzNDQ3NzA4Mn0.3DwH2WJCdbW5XM3NgBaKRtG1MGUadbkOGnHuWWR0NNs");

export const uploadToBucket = createAsyncThunk(
    'imageUpload/uploadToBucket', async (file) => {
        try {
            const fileName = `${uuidv4()}`;
            const { data} = await supabase.storage
            .from(bucketName)
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
                });
            const {data: urlData} = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName); 
            return urlData.publicUrl;

        } catch(fetchUrlError){
            console.error('Error uploading image:', fetchUrlError);
            return null;
        }
    }
);

export const deleteFromBucket = createAsyncThunk(
    'imageUpload/deleteFromBucket',
    async (publicUrl) => {
      try {
        const url = new URL(publicUrl);
        const filePath = url.pathname.split('/').slice(4).join('/');
        const { error } = await supabase.storage
          .from('your_bucket_name')
          .remove([filePath]);
  
        if (error) {
          throw error;
        }
        return filePath;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );

const imageUploadSlice = createSlice({
    name: 'imageUpload',
    initialState: {
        previewUrls:[], // urls to show images as preview
        storageUrls:[], // urls of the images once uploaded to storage, to be sent to BE on form submission
        uploadStatus: 'idle', 
        error: null
    },
    reducers:{
        setSelectedImages: (state, action) => {  
            state.previewUrls = [...state.previewUrls,{ url: action.payload, position: state.previewUrls.length }];
        },
        discardImage: (state,action) => {
            const positionToRemove = action.payload.position;

            // Create a copy of the arrays to maintain immutability
            const updatedPreviewUrls = [...state.previewUrls];
            const updatedStorageUrls = [...state.storageUrls];

            // Remove the image at the given position in previewUrls
            updatedPreviewUrls.splice(positionToRemove, 1);

            // Remove the URL at the same position in storageUrls
            updatedStorageUrls.splice(positionToRemove, 1);

            // Update the position for the remaining images in previewUrls
            updatedPreviewUrls.forEach((image, index) => {
                image.position = index; // Reassign positions after removal
            });

            // Update state with the new arrays
            state.previewUrls = updatedPreviewUrls;
            state.storageUrls = updatedStorageUrls;
        },
        resetImages: (state)=> {
            state.previewUrls = [];
            state.storageUrls = [];
        }
    },
    extraReducers: (builder) => {
    builder.addCase(uploadToBucket.fulfilled,(state,action)=> {
        state.uploadStatus = 'Successful';
        state.storageUrls = [...state.storageUrls,action.payload]
    });
    builder.addCase(uploadToBucket.pending, (state,action)=> {
        state.uploadStatus = 'In Progress';
    });
    builder.addCase(uploadToBucket.rejected, (state,action)=> {
        state.uploadStatus = 'Failed';
        state.error = action.payload;
    });
}
})

export const {setSelectedImages, discardImage, resetImages} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;