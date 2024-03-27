package app;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import exceptions.DataInvalidaException;
import exceptions.ElementoJaExisteException;
import exceptions.ParametroVazioException;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.ChoiceBox;
import javafx.scene.control.DatePicker;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import models.DiasDaSemana;
import models.OpcaoRefeicao;
import models.TipoRefeicao;
import negocio.Controlador;

public class TelaCDCardapioController {
    	
	private Stage stage;
    private Scene scene;
    private Parent root;

    @FXML
    private ChoiceBox<TipoRefeicao> cbTipo;
    @FXML
    private TextField principal1SegundaTextField;
    
    @FXML
    private TextField principal1TercaTextField;
    
    @FXML
    private TextField principal1QuartaTextField;
    
    @FXML
    private TextField principal1QuintaTextField;
    
    @FXML
    private TextField principal1SextaTextField;
    
    
    @FXML
    private TextField principal2SegundaTextField;
    
    @FXML
    private TextField principal2TercaTextField;
    
    @FXML
    private TextField principal2QuartaTextField;
    
    @FXML
    private TextField principal2QuintaTextField;
    
    @FXML
    private TextField principal2SextaTextField;
    
    
    @FXML
    private TextField fastSegundaTextField;
    
    @FXML
    private TextField fastTercaTextField;
    
    @FXML
    private TextField fastQuartaTextField;
    
    @FXML
    private TextField fastQuintaTextField;
    
    @FXML
    private TextField fastSextaTextField;
    
    
    @FXML
    private TextField vegetarianoSegundaTextField;
    
    @FXML
    private TextField vegetarianoTercaTextField;
    
    @FXML
    private TextField vegetarianoQuartaTextField;
    
    @FXML
    private TextField vegetarianoQuintaTextField;
    
    @FXML
    private TextField vegetarianoSextaTextField;
    
    
    @FXML
    private TextField sucoSegundaTextField;
    
    @FXML
    private TextField sucoTercaTextField;
    
    @FXML
    private TextField sucoQuartaTextField;
    
    @FXML
    private TextField sucoQuintaTextField;
    
    @FXML
    private TextField sucoSextaTextField;
    
    
    @FXML
    private TextField sobremesaSegundaTextField;
    
    @FXML
    private TextField sobremesaTercaTextField;
    
    @FXML
    private TextField sobremesaQuartaTextField;
    
    @FXML
    private TextField sobremesaQuintaTextField;
    
    @FXML
    private TextField sobremesaSextaTextField;
    
    @FXML
    private DatePicker datafinalCardapio;
    
    @FXML
    private DatePicker dataInicioCardapio;
    
    @FXML
    protected void initialize(){
       dataInicioCardapio.setValue(LocalDate.now());
       datafinalCardapio.setValue(LocalDate.now());
       ObservableList<TipoRefeicao> tipos = FXCollections.observableArrayList();
       tipos.add(TipoRefeicao.ALMOCO);
       tipos.add(TipoRefeicao.JANTAR);
       cbTipo.setItems(tipos);
       cbTipo.setValue(TipoRefeicao.ALMOCO);
    }


    @FXML
    protected void botaoCadastroCardapio(){
    	
    
    		try {
    			datafinalCardapio.setValue(dataInicioCardapio.getValue().plusDays(4));


    			Map<DiasDaSemana,OpcaoRefeicao> mapa=new HashMap<>();

    			mapa.put(DiasDaSemana.SEGUNDA,Controlador.getInstance().inserirOpcoes(principal1SegundaTextField.getText(),
						principal2SegundaTextField.getText(),vegetarianoSegundaTextField.getText(),fastSegundaTextField.getText(),
						sucoSegundaTextField.getText(),sobremesaSegundaTextField.getText(),cbTipo.getValue(),DiasDaSemana.SEGUNDA) );
    			
    			mapa.put(DiasDaSemana.TERCA,Controlador.getInstance().inserirOpcoes(principal1TercaTextField.getText(),
						principal2TercaTextField.getText(),vegetarianoTercaTextField.getText(),fastTercaTextField.getText(),
						sucoTercaTextField.getText(),sobremesaTercaTextField.getText(),cbTipo.getValue(),DiasDaSemana.TERCA) );
    			
    			mapa.put(DiasDaSemana.QUARTA,Controlador.getInstance().inserirOpcoes(principal1QuartaTextField.getText(),
						principal2QuartaTextField.getText(),vegetarianoQuartaTextField.getText(),fastQuartaTextField.getText(),
						sucoQuartaTextField.getText(),sobremesaQuartaTextField.getText(),cbTipo.getValue(),DiasDaSemana.QUARTA) );
    		
    			mapa.put(DiasDaSemana.QUINTA,Controlador.getInstance().inserirOpcoes(principal1QuintaTextField.getText(),
						principal2QuintaTextField.getText(),vegetarianoQuintaTextField.getText(),fastQuintaTextField.getText(),
						sucoQuintaTextField.getText(),sobremesaQuintaTextField.getText(),cbTipo.getValue(),DiasDaSemana.QUINTA) );
    			
    			mapa.put(DiasDaSemana.SEXTA,Controlador.getInstance().inserirOpcoes(principal1SextaTextField.getText(),
						principal2SextaTextField.getText(),vegetarianoSextaTextField.getText(),fastSextaTextField.getText(),
						sucoSextaTextField.getText(),sobremesaSextaTextField.getText(),cbTipo.getValue(),DiasDaSemana.SEXTA) );
    				
    			
    			
        		Controlador.getInstance().inserirCardapioSemanal(dataInicioCardapio.getValue(),mapa);
        		
        		
        		Alert info = new Alert(Alert.AlertType.INFORMATION);
                info.setTitle("Cardapio cadastrado");
                info.setContentText("O cardapio foi cadastrado com sucesso");
                info.show();
        		
        	}catch (ElementoJaExisteException e) {
        		Alert info = new Alert(Alert.AlertType.WARNING);
                info.setTitle("Cardapio já cadastrado");
                info.setContentText("O cardapio já existe");
                info.show();
        			
    		} catch (ParametroVazioException e) {
    			Alert info = new Alert(Alert.AlertType.WARNING);
                info.setTitle("Campo vazio!");
                info.setContentText(e.getMessage());
                info.show();
                
			} catch (DataInvalidaException e) {
                if(dataInicioCardapio.getValue().isBefore(LocalDate.now())){
                    Alert info = new Alert(Alert.AlertType.WARNING);
                    info.setTitle("Data invalida!");
                    info.setContentText("Não é possível inserir um cardápio com data anterior a hoje");
                    info.show();

                } else if (!dataInicioCardapio.getValue().getDayOfWeek().equals(DayOfWeek.MONDAY)) {
                    Alert info = new Alert(Alert.AlertType.WARNING);
                    info.setTitle("Data invalida!");
                    info.setContentText("A data inicial do cardápio deve ser uma segunda-feira");
                    info.show();
                }

			}
    	
    	
    }	

      @FXML
    protected void botaoVoltar(ActionEvent event) throws IOException {
          root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("TelaFuncionario.fxml")));
          stage = (Stage)((Node)event.getSource()).getScene().getWindow();
          scene = new Scene(root);
          stage.setScene(scene);
          stage.show();
          stage.setTitle("Tela Inicial");
    }
    
   
}


