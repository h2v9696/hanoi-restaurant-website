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
      field :name, :string do
        required true
      end
      field :price do
        required true
      end
      field :image_url, :carrierwave
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
      configure :cover_url, :carrierwave
      configure :description, :string do
        required true
      end
    end
  end

end
