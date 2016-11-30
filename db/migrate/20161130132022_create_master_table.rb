class CreateMasterTable < ActiveRecord::Migration[5.0]
  def change
    create_table :master_table do |t|
    	t.string :Gender
		t.string :Credential
		t.string :MedSchool
		t.string :PrimarySpec
		t.string :SecSpec1
		t.string :SecSpec2
		t.string :SecSpec3
		t.string :SecSpec4
		t.string :AllSecSpecs
		t.string :City
		t.string :State

		t.boolean :AcceptMedicareAssignment
		t.boolean :ReportedQualityMeasures
		t.boolean :UsedEHR
		t.boolean :ParticipatedMedicareMaintenance
		t.boolean :CommittedHeartHealth

		t.decimal :GradYear
		t.decimal :NumGroupPracMembers
		t.decimal :ZipCode
		t.decimal :DepressionScreeningAgg
		t.decimal :TobaccoScreeningAgg
		t.decimal :BodyWeightScreeningAgg
		t.decimal :BloodPressureScreeningAgg
		t.decimal :CompareNewOldMedAgg
		t.decimal :ReduceHeartAttackAgg
		t.decimal :PQRS_Participation
		t.decimal :FluShot
		t.decimal :PneumoniaVaccine
		t.decimal :BreastCancerScreening
		t.decimal :ColorectalCancerScreening
		t.decimal :CompareNewOldMed
		t.decimal :ControlBP_InDiabetesPatients
		t.decimal :Reduce
		t.decimal :ReduceHeartAttack
		t.decimal :HeartFailurePatients
		t.decimal :MedToImprovePumpingAction_HeartPatients

		t.references :physician_compare
		t.references :group_prac_coc
		t.references :ep_public_reporting
    end
  end
end
