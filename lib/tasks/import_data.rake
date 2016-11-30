namespace :import_data do
	task :populate_master_table => :environment do
		PhysicianCompare.where(nil).find_in_batches(batch_size: 1000) do |group|
			group.each do |record|
				entry = MasterTable.create(
					:Gender => record.Gender,
					:Credential => record.Credential,
					:MedSchool => record.MedSchool,
					:PrimarySpec => record.PrimarySpec,
					:SecSpec1 => record.SecSpec1,
					:SecSpec2 => record.SecSpec2,
					:SecSpec3 => record.SecSpec3,
					:SecSpec4 => record.SecSpec4,
					:AllSecSpecs => record.AllSecSpecs,
					:City => record.City,
					:State => record.State,
					:AcceptMedicareAssignment => record.AcceptMedicareAssignment,
					:ReportedQualityMeasures => record.ReportedQualityMeasures,
					:UsedEHR => record.UsedEHR,
					:ParticipatedMedicareMaintenance => record.ParticipatedMedicareMaintenance,
					:CommittedHeartHealth => record.CommittedHeartHealth,
					:GradYear => record.GradYear,
					:NumGroupPracMembers => record.NumGroupPracMembers,
					:ZipCode => record.ZipCode
					)
				ep_entry = EpPublicReporting.where(:FirstName => record.FirstName, :LastName => record.LastName).first
				group_prac = GroupPracCoc.where(:G_PAC_ID => record.G_PAC_ID).first
				if ep_entry && group_prac
					entry.update_attributes(
						:DepressionScreeningAgg => (ep_entry.DepressionScreening + group_prac.DepressionScreening)/2.to_f,
						:TobaccoScreeningAgg => (ep_entry.TobaccoScreening + group_prac.TobaccoScreening)/2.to_f,
						:BodyWeightScreeningAgg => (ep_entry.BodyWeightScreening + group_prac.BodyWeightScreening)/2.to_f,
						:BloodPressureScreeningAgg => (ep_entry.BloodPressureScreening + group_prac.BloodPressureScreening)/2.to_f,
						:CompareNewOldMedAgg => (ep_entry.CompareNewOldMed + group_prac.CompareNewOldMed)/2.to_f,
						:ReduceHeartAttackAgg => (ep_entry.ReduceHeartAttack + group_prac.ReduceHeartAttack)/2.to_f
						)
				elsif ep_entry
					entry.update_attributes(
						:DepressionScreeningAgg => ep_entry.DepressionScreening, 
						:TobaccoScreeningAgg => ep_entry.TobaccoScreening,
						:BodyWeightScreeningAgg => ep_entry.BodyWeightScreening, 
						:BloodPressureScreeningAgg => ep_entry.BloodPressureScreening,
						:CompareNewOldMedAgg => ep_entry.CompareNewOldMed,
						:ReduceHeartAttackAgg => ep_entry.ReduceHeartAttack 
						)
				elsif group_prac
					entry.update_attributes(
						:DepressionScreeningAgg => group_prac.DepressionScreening, 
						:TobaccoScreeningAgg => group_prac.TobaccoScreening,
						:BodyWeightScreeningAgg => group_prac.BodyWeightScreening, 
						:BloodPressureScreeningAgg => group_prac.BloodPressureScreening,
						:CompareNewOldMedAgg => group_prac.CompareNewOldMed,
						:ReduceHeartAttackAgg => group_prac.ReduceHeartAttack 
						)
				end

				entry.reload

				if group_prac
					entry.update_attributes(
						:PQRS_Participation => group_prac.PQRS_Participation,
						:FluShot => group_prac.FluShot,
						:PneumoniaVaccine => group_prac.PneumoniaVaccine,
						:BreastCancerScreening => group_prac.BreastCancerScreening,
						:ColorectalCancerScreening => group_prac.ColorectalCancerScreening,
						:CompareNewOldMed => group_prac.CompareNewOldMed,
						:ControlBP_InDiabetesPatients => group_prac.ControlBP_InDiabetesPatients,
						:Reduce => group_prac.Reduce,
						:ReduceHeartAttack => group_prac.ReduceHeartAttack,
						:HeartFailurePatients => group_prac.HeartFailurePatients,
						:MedToImprovePumpingAction_HeartPatients => group_prac.MedToImprovePumpingAction_HeartPatients
						)
				end
				# entry.physician_compare = record
				# entry.group_prac_coc = group_prac
				# entry.ep_public_reporting = ep_entry

				payments = Payment.where(:Physician_First_Name => record.FirstName, :Physician_Last_Name => record.LastName)
				payments.each do |payment|
					entry.Total_Amount_of_Payment_USDollars += payment.Total_Amount_of_Payment_USDollars
					entry.Form_of_Payment_or_Transfer_of_Value += payment.Form_of_Payment_or_Transfer_of_Value + ";"
					entry.Nature_of_Payment_or_Transfer_of_Value += payment.Nature_of_Payment_or_Transfer_of_Value + ";"
				end

				prescriptions = Prescription.where(:NPI => record.NPI)
				entry.Total_Drug_Count = prescriptions.select("distinct Drug_Name").count
				prescriptions.each do |pres|
					entry.Total_Drug_Cost += pres.Total_Drug_Cost + pres.Total_Drug_Cost_Ge65
					entry.Bene_Count += pres.Bene_Count
					entry.Total_Claim_Count += pres.Total_Claim_Count + pres.Total_Claim_Count_Ge65
					entry.Total_Day_Supply += pres.Total_Day_Supply + pres.Total_Day_Supply_Ge65
				end

				entry.save!
			end
		end
	end
end
