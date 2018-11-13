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
  end

end
