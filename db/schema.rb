# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161130132028) do

  create_table "GroupPrac_COC", id: false, force: :cascade do |t|
    t.text    "OrgLegalName"
    t.integer "G_PAC_ID",                                limit: 8
    t.text    "State"
    t.text    "PQRS_Participation"
    t.integer "FluShot"
    t.text    "Footnote110"
    t.integer "PneumoniaVaccine"
    t.text    "Footnote111"
    t.integer "DepressionScreening"
    t.text    "Footnote134"
    t.integer "TobaccoScreening"
    t.text    "Footnote226"
    t.integer "BodyWeightScreening"
    t.text    "Footnote128"
    t.integer "BloodPressureScreening"
    t.text    "Footnote317"
    t.integer "BreastCancerScreening"
    t.text    "Footnote112"
    t.integer "ColorectalCancerScreening"
    t.text    "Footnote113"
    t.integer "CompareNewOldMed"
    t.text    "Footnote46"
    t.integer "ControlBP_InDiabetesPatients"
    t.text    "FootnoteDM13"
    t.integer "Reduce"
    t.text    "FootnoteDM16"
    t.integer "ReduceHeartAttack"
    t.text    "Footnote204"
    t.integer "HeartFailurePatients"
    t.text    "Footnote8"
    t.integer "MedToImprovePumpingAction_HeartPatients"
    t.text    "Footnote118"
    t.index ["G_PAC_ID"], name: "index_GroupPrac_COC_on_G_PAC_ID"
  end

  create_table "GroupPrac_PatientExp", id: false, force: :cascade do |t|
    t.text    "OrgName"
    t.integer "G_PAC_ID",        limit: 8
    t.text    "State"
    t.integer "TimelyCare"
    t.text    "Footnote1"
    t.integer "Communication"
    t.text    "Footnote2"
    t.integer "PromoEdu"
    t.text    "Footnote5"
    t.integer "PatRating"
    t.text    "Footnote3"
    t.integer "Helpfulness"
    t.text    "Footnote8"
    t.integer "WorkingTogether"
    t.text    "Footnote9"
    t.integer "BetweenVisit"
    t.text    "Footnote10"
    t.integer "AttToMedCost"
    t.text    "Footnote12"
  end

  create_table "IndEPPublicReporting_COC", id: false, force: :cascade do |t|
    t.integer "NPI"
    t.integer "PAC_ID",                 limit: 8
    t.text    "LastName"
    t.text    "FirstName"
    t.integer "DepressionScreening"
    t.integer "TobaccoScreening"
    t.integer "BodyWeightScreening"
    t.integer "BloodPressureScreening"
    t.integer "CompareNewOldMed"
    t.integer "ReduceHeartAttack"
    t.index ["FirstName"], name: "index_IndEPPublicReporting_COC_on_FirstName"
    t.index ["LastName"], name: "index_IndEPPublicReporting_COC_on_LastName"
  end

  create_table "Payments", id: false, force: :cascade do |t|
    t.text    "Change_Type"
    t.text    "Covered_Recipient_Type"
    t.integer "Teaching_Hospital_CCN"
    t.integer "Teaching_Hospital_ID"
    t.text    "Teaching_Hospital_Name"
    t.integer "Physician_Profile_ID"
    t.text    "Physician_First_Name"
    t.text    "Physician_Middle_Name"
    t.text    "Physician_Last_Name"
    t.text    "Physician_Name_Suffix"
    t.text    "Recipient_Primary_Business_Street_Address_Line1"
    t.text    "Recipient_Primary_Business_Street_Address_Line2"
    t.text    "Recipient_City"
    t.text    "Recipient_State"
    t.integer "Recipient_Zip_Code"
    t.text    "Recipient_Country"
    t.text    "Recipient_Province"
    t.integer "Recipient_Postal_Code"
    t.text    "Physician_Primary_Type"
    t.text    "Physician_Specialty"
    t.text    "Physician_License_State_code1"
    t.text    "Physician_License_State_code2"
    t.text    "Physician_License_State_code3"
    t.text    "Physician_License_State_code4"
    t.text    "Physician_License_State_code5"
    t.text    "Submitting_Applicable_Manufacturer_or_Applicable_GPO_Name"
    t.integer "Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_ID"
    t.text    "Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Name"
    t.text    "Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_State"
    t.text    "Applicable_Manufacturer_or_Applicable_GPO_Making_Payment_Country"
    t.        "Total_Amount_of_Payment_USDollars"
    t.text    "Date_of_Payment"
    t.integer "Number_of_Payments_Included_in_Total_Amount"
    t.text    "Form_of_Payment_or_Transfer_of_Value"
    t.text    "Nature_of_Payment_or_Transfer_of_Value"
    t.text    "City_of_Travel"
    t.text    "State_of_Travel"
    t.text    "Country_of_Travel"
    t.text    "Physician_Ownership_Indicator"
    t.text    "Third_Party_Payment_Recipient_Indicator"
    t.text    "Name_of_Third_Party_Entity_Receiving_Payment_or_Transfer_of_Value"
    t.text    "Charity_Indicator"
    t.text    "Third_Party_Equals_Covered_Recipient_Indicator"
    t.text    "Contextual_Information"
    t.text    "Delay_in_Publication_Indicator"
    t.integer "Record_ID"
    t.text    "Dispute_Status_for_Publication"
    t.text    "Product_Indicator"
    t.text    "Name_of_Associated_Covered_Drug_or_Biological1"
    t.text    "Name_of_Associated_Covered_Drug_or_Biological2"
    t.text    "Name_of_Associated_Covered_Drug_or_Biological3"
    t.text    "Name_of_Associated_Covered_Drug_or_Biological4"
    t.text    "Name_of_Associated_Covered_Drug_or_Biological5"
    t.text    "NDC_of_Associated_Covered_Drug_or_Biological1"
    t.text    "NDC_of_Associated_Covered_Drug_or_Biological2"
    t.text    "NDC_of_Associated_Covered_Drug_or_Biological3"
    t.text    "NDC_of_Associated_Covered_Drug_or_Biological4"
    t.text    "NDC_of_Associated_Covered_Drug_or_Biological5"
    t.text    "Name_of_Associated_Covered_Device_or_Medical_Supply1"
    t.text    "Name_of_Associated_Covered_Device_or_Medical_Supply2"
    t.text    "Name_of_Associated_Covered_Device_or_Medical_Supply3"
    t.text    "Name_of_Associated_Covered_Device_or_Medical_Supply4"
    t.text    "Name_of_Associated_Covered_Device_or_Medical_Supply5"
    t.integer "Program_Year"
    t.text    "Payment_Publication_Date"
    t.index ["Physician_First_Name"], name: "index_Payments_on_Physician_First_Name"
    t.index ["Physician_Last_Name"], name: "index_Payments_on_Physician_Last_Name"
  end

  create_table "PhysicianCompare", force: :cascade do |t|
    t.integer "NPI",                             limit: 8
    t.integer "PAC_ID",                          limit: 8
    t.integer "PE_ID",                           limit: 8
    t.text    "LastName"
    t.text    "FirstName"
    t.text    "MiddleName"
    t.text    "Suffix"
    t.text    "Gender"
    t.text    "Credential"
    t.text    "MedSchool"
    t.integer "GradYear"
    t.text    "PrimarySpec"
    t.text    "SecSpec1"
    t.text    "SecSpec2"
    t.text    "SecSpec3"
    t.text    "SecSpec4"
    t.text    "AllSecSpecs"
    t.text    "OrgName"
    t.integer "G_PAC_ID",                        limit: 8
    t.integer "NumGroupPracMembers"
    t.text    "Line1Add"
    t.text    "Line2Add"
    t.text    "MarkerAddLine2suppression"
    t.text    "City"
    t.text    "State"
    t.integer "ZipCode"
    t.integer "PhoneNumber"
    t.text    "HosAffCCN1"
    t.text    "HospAffLBN1"
    t.text    "HosAffCCN2"
    t.text    "HosAffLBN2"
    t.text    "HosAffCCN3"
    t.text    "HosAffLBN3"
    t.text    "HosAffCCN4"
    t.text    "HosAffLBN4"
    t.text    "HosAffCCN5"
    t.text    "HosAffLBN5"
    t.text    "AcceptMedicareAssignment"
    t.text    "ReportedQualityMeasures"
    t.text    "UsedEHR"
    t.text    "ParticipatedMedicareMaintenance"
    t.text    "CommittedHeartHealth"
  end

  create_table "Prescription", id: false, force: :cascade do |t|
    t.integer "Npi"
    t.text    "Nppes_Provider_Last_Org_Name"
    t.text    "Nppes_Provider_First_Name"
    t.text    "Nppes_Provider_City"
    t.text    "Nppes_Provider_State"
    t.text    "Specialty_Desc"
    t.text    "Description_Flag"
    t.text    "Drug_Name"
    t.text    "Generic_Name"
    t.integer "Bene_Count"
    t.integer "Total_Claim_Count"
    t.integer "Total_Day_Supply"
    t.integer "Total_Drug_Cost"
    t.integer "Bene_Count_Ge65"
    t.text    "Bene_Count_Ge65_Suppress_Flag"
    t.integer "Total_Claim_Count_Ge65"
    t.text    "Ge65_Suppress_Flag"
    t.integer "Total_Day_Supply_Ge65"
    t.integer "Total_Drug_Cost_Ge65"
    t.index ["Npi"], name: "index_Prescription_on_NPI"
  end

  create_table "master_table", force: :cascade do |t|
    t.string  "Gender"
    t.string  "Credential"
    t.string  "MedSchool"
    t.string  "PrimarySpec"
    t.string  "SecSpec1"
    t.string  "SecSpec2"
    t.string  "SecSpec3"
    t.string  "SecSpec4"
    t.string  "AllSecSpecs"
    t.string  "City"
    t.string  "State"
    t.boolean "AcceptMedicareAssignment"
    t.boolean "ReportedQualityMeasures"
    t.boolean "UsedEHR"
    t.boolean "ParticipatedMedicareMaintenance"
    t.boolean "CommittedHeartHealth"
    t.decimal "GradYear"
    t.decimal "NumGroupPracMembers"
    t.decimal "ZipCode"
    t.decimal "DepressionScreeningAgg"
    t.decimal "TobaccoScreeningAgg"
    t.decimal "BodyWeightScreeningAgg"
    t.decimal "BloodPressureScreeningAgg"
    t.decimal "CompareNewOldMedAgg"
    t.decimal "ReduceHeartAttackAgg"
    t.decimal "PQRS_Participation"
    t.decimal "FluShot"
    t.decimal "PneumoniaVaccine"
    t.decimal "BreastCancerScreening"
    t.decimal "ColorectalCancerScreening"
    t.decimal "CompareNewOldMed"
    t.decimal "ControlBP_InDiabetesPatients"
    t.decimal "Reduce"
    t.decimal "ReduceHeartAttack"
    t.decimal "HeartFailurePatients"
    t.decimal "MedToImprovePumpingAction_HeartPatients"
    t.integer "physician_compare_id"
    t.integer "group_prac_coc_id"
    t.integer "ep_public_reporting_id"
    t.integer "Total_Drug_Count",                        limit: 8
    t.decimal "Total_Drug_Cost",                                   default: "0.0"
    t.decimal "Bene_Count",                                        default: "0.0"
    t.decimal "Total_Claim_Count",                                 default: "0.0"
    t.decimal "Total_Day_Supply",                                  default: "0.0"
    t.decimal "Total_Amount_of_Payment_USDollars",                 default: "0.0"
    t.string  "Form_of_Payment_or_Transfer_of_Value",              default: ""
    t.string  "Nature_of_Payment_or_Transfer_of_Value",            default: ""
    t.index ["ep_public_reporting_id"], name: "index_master_table_on_ep_public_reporting_id"
    t.index ["group_prac_coc_id"], name: "index_master_table_on_group_prac_coc_id"
    t.index ["physician_compare_id"], name: "index_master_table_on_physician_compare_id"
  end

end