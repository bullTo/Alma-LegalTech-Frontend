// src/features/leads/leadSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Lead {
  id:string,
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

interface LeadState {
  leads: Lead[];
}

const initialState: LeadState = {
  leads: [],
};

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload);
    },
    updateLeadStatus: (state, action: PayloadAction<{ index: number; status: string }>) => {
      state.leads[action.payload.index].status = action.payload.status;
    },
  },
});

export const { addLead, updateLeadStatus } = leadSlice.actions;
export default leadSlice.reducer;
