RailsAdmin.config do |config|
  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    bulk_delete
    show
    edit
    delete

  end

  config.included_models = ["Restaurant", "Dish"]

  config.model 'Dish' do
    visible false
    edit do
      configure :name, :string do
        required true
      end
      configure :price do
        required true
      end
    end
  end

  config.model 'Restaurant' do
    edit do
      configure :name, :string do
        required true
      end
      configure :address, :string do
        required true
      end
      configure :phone, :string do
        required true
      end
      configure :description, :string do
        required true
      end
    end
  end

end
